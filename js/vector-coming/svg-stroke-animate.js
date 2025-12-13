document.addEventListener('DOMContentLoaded', function() {
    
    // Check if GSAP and DrawSVG are available (provided by Webflow)
    if (typeof gsap === 'undefined' || typeof DrawSVGPlugin === 'undefined') {
        console.error("GSAP or DrawSVGPlugin is not loaded. Please check Webflow Project Settings.");
        return;
    }

    // Target all paths with the CORRECT class 'stroke'
    const vectors = document.querySelectorAll('.stroke');

    if (vectors.length > 0) {
        
        // --- 1. SET INITIAL STATE ---
        // Hide the stroke instantly by setting drawSVG to 0%
        gsap.set(vectors, { drawSVG: "0%" });

        // --- 2. CREATE THE STROKE ANIMATION ---
        gsap.fromTo(vectors, {
            // Start the stroke fully drawn (needed for the animation path)
            drawSVG: "0%"
        }, {
            // End the stroke fully drawn
            duration: 2, 
            delay: 0.5, // Start after a short delay
            drawSVG: "100%", 
            ease: "power2.inOut",
            stagger: 2, // Stagger the animation slightly between different paths
            
            // Optional: Add a simple color flash or transformation for creativity
            onComplete: function() {
                gsap.to(vectors, {
                    duration: 0.5,
                    fill: "none", // Fill the word once the stroke is complete
                    delay: 0.2
                });
            }
        });
    } else {
        console.warn("SVG Stroke Animation: No elements found with class '.stroke'.");
    }
});
