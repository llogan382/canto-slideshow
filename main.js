import CantoCreds from './keys.js';

let appendHere = document.querySelector(".images");

let request = new Request('https://highpoint.canto.com/api/v1/album/V5PFF', { method: 'GET', credentials: 'include' });
const url = request.url;
const method = request.method;
const myHeaders = url.headers;
let headers = new Headers();
headers.append("Authorization", "Bearer" + CantoCreds.accessToken);
const credentials = request.credentials;

fetch(request)
    .then(response => response.json())
    .then(images => {
        for (const image of images.results) {
            console.log(image);
            var imageCont =
                appendHere.innerHTML += `
            <img src="${image.url.directUrlPreview}">
            `
        }
    });
