document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof gsap === 'undefined' || typeof DrawSVGPlugin === 'undefined') {
        console.error("GSAP or DrawSVGPlugin is not loaded. Please check Webflow Project Settings.");
        return;
    }

    const vectors = document.querySelectorAll('.stroke');

    if (vectors.length > 0) {
        
        // --- 1. SET INITIAL STATE ---
        // Hide the stroke instantly by setting drawSVG to 0% and initial fill to transparent.
        gsap.set(vectors, { 
            drawSVG: "0%", 
            fill: "rgba(0,0,0,0)" // Start with transparent fill (optional, but clean)
        });

        // --- 2. CREATE THE STROKE ANIMATION ---
        gsap.fromTo(vectors, {
            drawSVG: "0%"
        }, {
            duration: 2, 
            delay: 0.5, 
            drawSVG: "100%", 
            ease: "power2.inOut",
            stagger: 0.15, 
            
            // --- CRITICAL FIX: FILL THE SHAPE ONCE DRAWING IS DONE ---
            onComplete: function() {
                gsap.to(vectors, {
                    duration: 0.5,
                    fill: "none", // Apply the final, solid black fill
                    stagger: 0,     // Apply simultaneously to all paths
                    delay: 0.2
                });
            }
        });
    } else {
        console.warn("SVG Stroke Animation: No elements found with class '.stroke'.");
    }
});
