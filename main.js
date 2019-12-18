import * as keys from './keys.js';


let appendHere = document.querySelector(".images");

let request = new Request('https://highpoint.canto.com/api/v1/album/V5PFF?access_token=de19c0516699460f9a4fffa409171810', { method: 'GET', credentials: 'include' });
const url = request.url;
const method = request.method;
const myHeaders = url.headers;
let headers = new Headers();
headers.append("Authorization", "Bearer de19c0516699460f9a4fffa409171810");
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
