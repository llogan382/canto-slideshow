import CantoCreds from './keys.js';

let appendHere = document.querySelector(".searchResults");





const runQuery = (directory) => {
    appendHere.innerHTML = ""; //clear html before query

    let results = '/?scheme=folder|album|image|video&layer=1'; //how to sort the results

    let queryFolder = (directory) ? directory : '/tree'; //default is tree. Then, run folders

    let request = new Request('https://highpoint.canto.com/api/v1' + queryFolder + results, { method: 'GET', credentials: 'include' });

    let headers = new Headers();
    headers.append("Authorization", "Bearer" + CantoCreds.accessToken);

    fetch(request)
        .then(response => response.json())
        .then(folders => {


            for (const folder of folders.results) { //loop over results

                var cantoButton = document.createElement("A"); //create a buton

                cantoButton.setAttribute("href", folder.url.detail); //create link for each button

                var textnode = document.createTextNode(folder.name); //add text to the button

                cantoButton.appendChild(textnode);


                appendHere.appendChild(cantoButton).addEventListener("click", function newQuery(e) { //add an event listener

                    event.preventDefault();

                    queryFolder = '/folder/' + folder.id; //update query to look in folders

                    runQuery(queryFolder); //pass the new query in to run the next search
                });

                cantoButton.insertAdjacentHTML("afterend", "</br>"); //add a break after each button for the list
            }

        });
};

runQuery();