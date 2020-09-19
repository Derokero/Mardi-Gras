// Initialize galllery
// <a data-fancybox="gallery" href="image.jpg"><img src="image.jpg"></a>

(function init() {
    const imageCount = 15;
    const gallery = document.getElementById("gallery"); // Gallery reference

    // Create gallery elements
    for (let i = 0; i < imageCount; i++) {
        const link = document.createElement("a"); // Create hyperlink needed for Fancybox
        const source = "images/gallery/gallery_img" + i + ".jpg"; // Set source

        const image = document.createElement("img"); // Create image needed for Fancybox
        image.setAttribute("src", source); // Set source to image
        image.setAttribute("alt", "Mardi Gras gallery picture"); // Set alt

        link.setAttribute("data-fancybox", "gallery"); // Needed by Fancybox
        link.setAttribute("href", source); // Source

        link.appendChild(image); // Add image to hyperlink
        gallery.appendChild(link); // Add hyperlink to gallery
    }

})(); // Invoke