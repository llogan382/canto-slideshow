import CantoCreds from './keys.js';

let appendHere = document.querySelector(".searchResults");



async function runQuery(empty) {
    let folderID = (empty) ? empty : "";
    let response = await fetch('https://highpoint.canto.com/api/v1' + '/tree/' + folderID + '?sortby=scheme&layer=1', { method: 'GET', credentials: 'include' });
    console.log(`this is emtpty ${folderID}`);
    // let headers = new Headers();
    // headers.append("Authorization", "Bearer" + CantoCreds.accessToken);
    return await response.json();

}
function getLinks() {
    let allLinks = document.querySelectorAll('.cantoLink');
    for (const link of allLinks) {
        let linkID = link.attributes.href.value.slice(-5);
        link.addEventListener("click", function runScript() {
            runQuery(linkID);
        });
    }
}


runQuery()
    .then((json => {
        console.log('after async');
        for (const folder of json.results) { //loop over results
            var cantoButton = document.createElement("DIV"); //create a buton
            cantoButton.setAttribute("href", folder.url.detail); //create link for each button
            cantoButton.setAttribute("class", 'cantoLink'); //create link for each button

            var textnode = document.createTextNode(folder.name); //add text to the button

            cantoButton.appendChild(textnode);

            appendHere.appendChild(cantoButton);
            cantoButton.insertAdjacentHTML("afterend", "</br>");
        }
        getLinks();

    })
    );
