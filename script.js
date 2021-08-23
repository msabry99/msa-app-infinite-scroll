// Main Setup Variables OF API 
const count = 30;
const apiKey = 'di1QB3Hh7uurBGjOZsLmBjRfV3E-DqYe3festYLtCrE';
const API = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Main Variables OF Elements
const fullContentPageWrapper = document.getElementById("full-content");
const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Function To Set Attribute For Element
function setAttributeElement(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

// Function When All Images Loaded In The Page 
function imgLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    isReady = true;
    loader.hidden = true;
    loader.style.display = 'none';
  }
}

// Function For Creating Photos Cards and Display it into DOM
function createPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    const item = document.createElement('a');
    setAttributeElement(item, {
      href: photo.links.html,
      class: 'img-link',
      target: '_blank'
    });

    const figure = document.createElement('figure');
    
    const img = document.createElement('img');
    setAttributeElement(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });
    img.addEventListener('load', imgLoaded);

    const figureCaption = document.createElement('figcaption');
    figureCaption.textContent = photo.alt_description;

    figure.appendChild(img);
    figure.appendChild(figureCaption);
    item.appendChild(figure);
    imageContainer.appendChild(item);
  })
}

// Function to Load Random Photos From Unsplash API
async function getRandomImages() {
  try {
    const response = await fetch(API);
    const data = await response.json();

    photosArray = data;

    createPhotos();

  } catch(error) {
    console.log(error);
  }
}

// Function To Load More Photos When Reaching To The Bottom Of The Page 
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {
    createPhotos();
    isReady = false;
  }
})

// Fire Photos
getRandomImages();
