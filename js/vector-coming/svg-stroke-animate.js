document.addEventListener('DOMContentLoaded', function() {
    
    // Check if GSAP and DrawSVG are available (provided by Webflow)
    if (typeof gsap === 'undefined' || typeof DrawSVGPlugin === 'undefined') {
        console.error("GSAP or DrawSVGPlugin is not loaded. Please check Webflow Project Settings.");
        return;
    }

    // Target all paths with the class 'stroke'
    const vectors = document.querySelectorAll('.stroke');

    if (vectors.length > 0) {
        
        // --- 1. SET INITIAL STATE ---
        // Hide the stroke instantly by setting drawSVG to 0%
        // NOTE: Fill is set to 'none' in the SVG markup itself, which is correct.
        gsap.set(vectors, { 
            drawSVG: "0%" 
        });

        // --- 2. CREATE THE STROKE ANIMATION (The Draw-On Effect) ---
        gsap.fromTo(vectors, {
            // Start the stroke fully hidden
            drawSVG: "0%"
        }, {
            // End the stroke fully visible
            duration: 2, 
            delay: 0.5, // Start after a short delay
            drawSVG: "100%", 
            ease: "power2.inOut",
            stagger: 0.15, // Stagger the animation slightly between different paths
            
            // The onComplete function to apply the fill has been removed.
            // The paths will remain the visible green stroke.
        });
    } else {
        console.warn("SVG Stroke Animation: No elements found with class '.stroke'.");
    }
});
