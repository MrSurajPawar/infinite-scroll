const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API 
const count = 5;   // for now 
const apiKey = 'odftsiCIn4p6yjNb1dqRTVqI3IDT_Lc3vjg4rdNCpuw';  //Access key generated from the unsplash 
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;    // BASE URL

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++; 
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Helper Function to set attributes of the element
function setAttributes( element , attributes) {
    for (let key in attributes) {
        element.setAttribute(key , attributes[key]);     //in-build method to set attributes of the element
    }
}

//Create Elements for links , photos and DOM
function displayPhotos() {
    imagesLoaded = 0;           //reseting the images count 
    totalImages = photosArray.length;

    //Runs function for each object in photoArray
    photosArray.forEach( (photo) => {
        //Creating <a> element 
        const item = document.createElement("a"); 
        setAttributes(item , {
            href : photo.links.html,
            target : "_blank" ,
        });

        //Creating img element 
        const img = document.createElement("img");
        setAttributes(img , {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });
        
        //Event listener , check when each is finished loading
        img.addEventListener("load" , imageLoaded);

        //Put <img> inside <a> , and <a> inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);        
    });
}

//Get photos from the Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Handling error here
        alert(error);
    }
}

//Check to see if scrolling near the bottom of the page , load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;  //stop loading 
        getPhotos();    //get more photos
    }
});

//On load
getPhotos();