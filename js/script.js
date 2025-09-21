var taglines = [
    "AI Agent Engineer",
    "Voice + Chat Agents",
    "LLMs • RAG • vLLM",
    "Telephony • SIP • ITSM",
    "Sub-second Latency Pipelines",
    "Spring Boot • React",
];

var taglineElement = document.getElementById("tagline");

if (taglineElement) {
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

    // Initialize the tagline only if the element exists
    updateTagline();
}


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

// Profile view counter (CountAPI)
(function () {
    const COUNTAPI_NAMESPACE = 'mridulrao_github_io';
    const COUNTAPI_KEY = 'profile_views';
    const VIEW_STORAGE_KEY = 'viewCounterLastHit'; // YYYY-MM-DD

    function updateProfileViews() {
        const el = document.getElementById('view-count');
        const today = new Date().toISOString().slice(0, 10);
        try {
            const last = localStorage.getItem(VIEW_STORAGE_KEY);
            const base = 'https://api.countapi.xyz';
            const endpoint = last === today ? '/get' : '/hit';
            const url = `${base}${endpoint}/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`;

            fetch(url)
                .then(r => r.json())
                .then(data => {
                    if (el && typeof data.value === 'number') {
                        el.textContent = data.value.toLocaleString();
                    }
                    if (endpoint === '/hit') {
                        localStorage.setItem(VIEW_STORAGE_KEY, today);
                    }
                })
                .catch(() => {
                    if (el) el.textContent = '—';
                });
        } catch (e) {
            if (el) el.textContent = '—';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateProfileViews);
    } else {
        updateProfileViews();
    }
})();
