import CantoCreds from './keys.js';

let appendHere = document.querySelector(".searchResults");
let eventListeners = document.querySelectorAll('.searchResults');


async function runQuery(url) {
    console.log(url);
    let response = await fetch(url, { method: 'GET', credentials: 'include' });
    // let headers = new Headers();
    // headers.append("Authorization", "Bearer" + CantoCreds.accessToken);
    return await response.json();
}



async function displayResults(url) {

    let jsonData = runQuery(url);
    const newQuery = (event) => {
        console.log(event);
        event.preventDefault();
        displayResults('https://highpoint.canto.com/api/v1/tree/' + id + '?sortby=scheme&layer=1');
        // console.log(id);
    }
    jsonData
        .then((json => {
            let htmlResults = json.results.map(x =>
                `<div class="searchResults">${x.name}</div>`);
            return htmlResults;
        }

        ))
        .then((html) => {
            let removeCommas = html.toString();
            let newHTML = removeCommas.replace(/\>,/g, '>');

            appendHere.innerHTML = newHTML;

        });

}



displayResults('https://highpoint.canto.com/api/v1/tree/?sortby=scheme&layer=1');