const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 10;
const apiKey = "45496333-3fa1d67e86f676313d5f86f45";
const query = "galaxy";
const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=${count}`;

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.style.display = "none";
    }
}

function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;

    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.pageURL,
            target: "_blank",
        });

        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.webformatURL,
            alt: photo.tags,
            title: photo.tags,
        });

        img.addEventListener("load", imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        photosArray = data.hits;
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        loader.style.display = "flex";
        getPhotos();
    }
});

getPhotos();
