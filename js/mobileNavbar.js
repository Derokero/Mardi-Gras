// Mobile menu

const navbar = document.querySelector(".navbar");
const hamburger = navbar.querySelector(".hamburger");
const lis = navbar.querySelectorAll("ul > li");
let menuState = 0;


// Control menu hiding/showing
function menuShow(state) {
    if (state) {
        for (const li of lis) {
            // Set custom CSS to open menu
            li.style.cssText = "visibility: visible;    \
                                margin: 0;              \
                                opacity: 0.95;";
        }
    } else {
        for (const li of lis) {
            li.style.cssText = ""; // Clear inline CSS 
        }
    }
    menuState = state; // Update state
}

// Toggle menu
document.querySelector(".navbar > .hamburger").addEventListener("click", function () {
    menuState ^= 1; // Toggle state
    menuShow(menuState); // Hide/show depending on state
});

// Close menu automatically when the menu panel is not in view
document.addEventListener("scroll", function () {
    if (menuState) {
        let domRect = hamburger.getBoundingClientRect(); // Get DOM position relative to viewport
        if (domRect.bottom <= 0) // Hide menu when out of view
            menuShow(0);
    }

});

// Close when pressed anywhere outside
document.addEventListener("click", function (ev) {
    if (menuState && !navbar.contains(ev.target)) // Does navbar has the element we pressed?
        menuShow(0); // Pressed outside of menu
});