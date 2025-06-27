// Open Lightbox
function openLightbox(imageSrc) {
    document.getElementById('lightbox').style.display = "flex";
    document.getElementById('lightbox-img').src = imageSrc;
}

// Close Lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}
