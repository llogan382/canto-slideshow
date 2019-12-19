import CantoCreds from './keys.js';

let appendHere = document.querySelector(".images");


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

let request = new Request('https://highpoint.canto.com/api/v1/tree' + results, { method: 'GET', credentials: 'include' });
const url = request.url;
const method = request.method;
const myHeaders = url.headers;
let headers = new Headers();
headers.append("Authorization", "Bearer" + CantoCreds.accessToken);
const credentials = request.credentials;

fetch(request)
    .then(response => response.json())
    .then(folders => {
        for (const folder of folders.results) {
            var folderButtons =
                appendHere.innerHTML += `
            <a href="${folder.url.detail}"> ${folder.name}</a> </br>
            `
        }
    });
