// src/directives/scrollReveal.js

// This observer watches elements to see when they enter the viewport
const animatedScrollObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            // If the element is visible on screen...
            if (entry.isIntersecting) {
                // Add the class that triggers the animation to finish
                entry.target.classList.add('enter');
                // Stop watching it (so it only animates once)
                observer.unobserve(entry.target);
            }
        });
    },
    { 
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slightly offset to ensure it happens as it scrolls up
    }
);

export default {
    // When the element is attached to the DOM:
    mounted(el) {
        // Add initial class (hidden and pushed down)
        el.classList.add('before-enter');
        // Start watching the element
        animatedScrollObserver.observe(el);
    }
};