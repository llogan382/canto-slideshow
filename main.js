import CantoCreds from './keys.js';

let appendHere = document.querySelector(".searchResults");


function addButtons() {
    let cantoItems = document.querySelectorAll('.canto-items');

    for (const item of cantoItems) {
        item.addEventListener("click", function newQuery(event) {
            let id = event.target.dataset.target;

            console.log(id);
        });
    }
}

async function runQuery(url) {
    let response = await fetch(url, { method: 'GET', credentials: 'include' });
    // let headers = new Headers();
    // headers.append("Authorization", "Bearer" + CantoCreds.accessToken);
    return await response.json();
}



async function displayResults(url) {

    let jsonData = runQuery(url);

    jsonData
        .then((json => {
            let htmlResults = json.results.map(x =>
                `<div data-target="${x.id}" class="canto-items">${x.name}</div>`);

            return htmlResults;
        }
        ))
        .then((html) => {
            let removeCommas = html.toString();
            let newHTML = removeCommas.replace(/\>,/g, '>');

            return newHTML;

        }).then(addHTML => {
            appendHere.innerHTML = addHTML;
            return;
        }).then((folders) => {
            addButtons(folders);
        })
        ;

}



displayResults('https://highpoint.canto.com/api/v1/tree/?sortby=scheme&layer=1');