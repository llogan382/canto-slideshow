import CantoCreds from './keys.js';

let appendHere = document.querySelector(".images");
let cantoButton = document.createElement("li");

/*

The following properties are used in Canto:

Scheme: Image, Video, Audio, Document, Presentation, and Other.
Id: Id of the Folder, Album or Asset
Created:  Original created time.
Time: Last modified time.
Owner: The User Id of first the uploader.
OwnerName: The Username of the asset owner.
*/

let results = '/?sortBy=name&scheme=folder&layer=1';
let queryFolder = '/tree';
let request = new Request('https://highpoint.canto.com/api/v1' + queryFolder + results, { method: 'GET', credentials: 'include' });
const url = request.url;
const method = request.method;
const myHeaders = url.headers;
let headers = new Headers();
headers.append("Authorization", "Bearer" + CantoCreds.accessToken);
const credentials = request.credentials;


const newQuery = (e) => {
    e.preventDefault();
    console.log('hello');
}

fetch(request)
    .then(response => response.json())
    .then(folders => {


        for (const folder of folders.results) {
            //When you click the button, the query is updated to the next folder


            // console.log(folder);
            var folderButtons =
                appendHere.innerHTML += `
            <button onclick="newQuery" href="${folder} target="_blank"> ${folder.name}</button> </br>
            `;
        }

    });

