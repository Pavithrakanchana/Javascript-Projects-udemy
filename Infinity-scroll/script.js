const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
let photosArr = [];
let ready = false;
let imagesLoaded = 0;
let totalImg = 0;
let initalLoad = true;

//Unsplash API - only 50 req will be triggered in one hr, after that it will thow 403 - forbidden
let count = 5;
const apiKey = 'MUm-bLMiVbUBnGjw33yIMDaATunZRlE-ejLTgPT5oqY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded() {
    console.log('image Loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImg) {
        ready = true;
        loader.hidden = true;
        initalLoad = false;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

        console.log('ready = ', ready);

    }
}


//helper function to set attribute on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImg = photosArr.length;
    console.log('totalImg: ', totalImg);
    //run function for each object in photosarray
    photosArr.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imagecontainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArr = await response.json();
        //console.log(photosArr);
        displayPhotos();
    } catch (error) {
        //catch error
    }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        //    console.log('window.innerHeight:', window.innerHeight);
        //    console.log('window.scrollY:', window.scrollY); 
        //    console.log('window.innerHeight + window.scrollY', window.innerHeight + window.scrollY); 
        //    console.log('document.body.offsetHeight - 1000:', document.body.offsetHeight - 1000); 
        //    console.log('Load more'); 
        ready = false;
        getPhotos();


    }
});

//onLoad
getPhotos();
