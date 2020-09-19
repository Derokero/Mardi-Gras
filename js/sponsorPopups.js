const sponsors = Object.values(document.querySelectorAll(".sponsor")); // Get all sponsors, as array


document.addEventListener("scroll", function reveal() {
    sponsors.forEach((sponsor, index) => {
        const sponsRect = sponsor.getBoundingClientRect(); // Get sponsor bounding box data
        if (sponsRect.bottom <= window.innerHeight && sponsRect.top >= 0) { // Is sponsor in view?
            sponsor.style.cssText = "transform: scale(1); opacity: 1;" // Animate
            sponsors.splice(index, 1); // Remove from array
        }
    });

    // Remove event listener when all sponsors have been revealed (empty array)
    if (!sponsors.length) {
        document.removeEventListener("scroll", reveal);
    }
});