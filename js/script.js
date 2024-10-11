var taglines = [
    "NLP Enthusiast",
    "AI Specialist",
    "Grad @ USC",
    "Creative Thinker",
];

var taglineElement = document.getElementById("tagline");

var taglineIndex = 0;
var speed = 50;
var i = 0;
var direction = "forward"; // "forward" or "backward"

function updateTagline() {
    if (direction === "forward") {
        if (i <= taglines[taglineIndex].length) {
            taglineElement.innerHTML = taglines[taglineIndex].substring(0, i);
            i++;
            setTimeout(updateTagline, speed);
        } else {
            direction = "backward";
            setTimeout(updateTagline, 1000); // Wait for 1 second before erasing
        }
    } else if (direction === "backward") {
        if (i >= 0) {
            taglineElement.innerHTML = taglines[taglineIndex].substring(0, i);
            i--;
            setTimeout(updateTagline, speed);
        } else {
            direction = "forward";
            taglineIndex = (taglineIndex + 1) % taglines.length;
            setTimeout(updateTagline, 1000); // Wait for 1 second before typing the next tagline
        }
    }
}

// Initialize the tagline
updateTagline();


// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // If href starts with '#', it's an in-page link.
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Otherwise, allow normal page navigation (external pages like experience.html)
            window.location.href = href;
        }
    });
});

