document.addEventListener('DOMContentLoaded', function() {
    
    // Select elements after DOM is ready
    const faceButton = document.querySelector('.face-button');
    const faceContainer = document.querySelector('.face-container');
    const containerCoords = document.querySelector('#container');
    
    // Check for element existence before proceeding
    if (containerCoords && faceButton && faceContainer) {
        
        // --- CRITICAL CSS OVERRIDE FIX ---
        // We use GSAP to set the container to position: relative and reset any inherited transforms.
        gsap.set(containerCoords, { position: "relative", transformStyle: "flat" }); 
        
        // Get initial dimensions (needed for relative movement calculation)
        const rect = faceButton.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Get the initial page offset of the container for reliable calculations
        const containerOffsetX = containerCoords.offsetLeft;
        const containerOffsetY = containerCoords.offsetTop;

        // --- MOUSE MOVE LISTENER (GSAP V3 TRANSLATION) ---
        faceButton.addEventListener('mousemove', function(e) {
            
            // Mouse position relative to the container element
            const mouseX = e.pageX - containerOffsetX;
            const mouseY = e.pageY - containerOffsetY;
            
            // Calculate normalized movement (-1 to 1) based on center offset
            const normalizedX = (mouseX - centerX) / rect.width;
            const normalizedY = (mouseY - centerY) / rect.height;

            // 1. Move the outer button
            gsap.to(faceButton, {
                duration: 0.3, 
                x: normalizedX * 50,
                y: normalizedY * 50,
                ease: "power4.out" 
            });

            // 2. Move the inner face container
            gsap.to(faceContainer, {
                duration: 0.3, 
                x: normalizedX * 25,
                y: normalizedY * 25,
                ease: "power4.out"
            });
        });

        // --- MOUSE ENTER/LEAVE LISTENERS ---
        
        faceButton.addEventListener('mouseenter', function(e) {
            gsap.to(faceButton, {
                duration: 0.3, 
                scale: 0.975
            });
        });

        faceButton.addEventListener('mouseleave', function(e) {
            gsap.to(faceButton, {
                duration: 0.3, 
                x: 0,
                y: 0,
                scale: 1
            });
            
            gsap.to(faceContainer, {
                duration: 0.3, 
                x: 0,
                y: 0,
                scale: 1
            });
        });

    } else {
        console.error("GSAP Face: Missing required anchor element (#container) or elements are not ready.");
    }
});
