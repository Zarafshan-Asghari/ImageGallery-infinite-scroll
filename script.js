"use strict";
// selecting elements-----------------------------------------
const container = document.getElementById("imageContainer");
const loader = document.getElementById("loader");
let readyToScroll = false;
let imgsLoad = 0;

const numberPic = 2;
const apiK = `LG3HadDpGrCjVVeoUGZvyHwzskjZa5-pIG_pUoIkoTo`;

const url = ` https://api.unsplash.com/photos/random?query=city+nature+cats+horse+mountain+flowers&orientation=landscape&client_id=${apiK}&count=${numberPic}`;
let arrayImage = [];
async function getImages() {
  try {
    const resp = await fetch(url);
    arrayImage = await resp.json();

    displayImg();
  } catch (err) {}
}
getImages();

function displayImg() {
  imgsLoad = 0;
  // run function for each image
  arrayImage.forEach((image) => {
    // Creat <img> for every img
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", image.urls.regular);
    imgElement.setAttribute("title", image.alt_description);
    imgElement.setAttribute("alt", image.alt_description);

    // put <img> in img container
    container.appendChild(imgElement);

    // img event when img load
    imgElement.addEventListener("load", imgLoaded());
  });
}

function imgLoaded() {
  imgsLoad++;
  console.log(imgsLoad);
  if (imgsLoad === numberPic) {
    readyToScroll = true;
    removeLoadingSvg();
  }
}

// making infinite scroll
window.addEventListener("scroll", () => {
  // console.log("scrolling");
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToScroll
  ) {
    readyToScroll = false;
    getImages();
  }
});
// loading svg
// function loadingsvg() {
//   loader.classList.add("hidden");
// }

// remove loading svg
function removeLoadingSvg() {
  // to add hidden class
  loader.classList.add("hidden");
}
