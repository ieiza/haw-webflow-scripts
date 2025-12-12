document.addEventListener('DOMContentLoaded', function() {
    
    // We only need the element coordinates inside the button's event listeners
    const faceButton = document.querySelector('.face-button');
    const faceContainer = document.querySelector('.face-container');
    const containerCoords = document.querySelector('#container'); 
    
    if (containerCoords && faceButton && faceContainer) {
        
        // Get the initial dimensions
        const rect = faceButton.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // --- MOUSE MOVE LISTENER (Button Movement) ---
        faceButton.addEventListener('mousemove', function(e) {
          
          // **NEW RELIABLE CALCULATION:** Use e.offsetX/Y (mouse position relative to the target element)
          const mouseX = e.offsetX; 
          const mouseY = e.offsetY; 
          
          // Calculate normalized movement (-1 to 1) based on center offset
          const normalizedX = (mouseX - centerX) / centerX;
          const normalizedY = (mouseY - centerY) / centerY;
          
          // Apply movement to the Button (50px max movement)
          gsap.to(faceButton, {
              duration: 0.3, 
              x: normalizedX * 50, // Max 50px travel
              y: normalizedY * 50,
              ease: "power4.out"
            });
            
          // Apply movement to the Face Container (25px max movement)
          gsap.to(faceContainer, {
              duration: 0.3, 
              x: normalizedX * 25, // Max 25px travel
              y: normalizedY * 25,
              ease: "power4.out"
            });
        });

        // --- MOUSE ENTER/LEAVE LISTENERS ---
        faceButton.addEventListener('mouseenter', function(e) {
          gsap.to(faceButton, { duration: 0.3, scale: 0.975 });
        });

        faceButton.addEventListener('mouseleave', function(e) {
          gsap.to(faceButton, { duration: 0.3, x: 0, y: 0, scale: 1 });
          gsap.to(faceContainer, { duration: 0.3, x: 0, y: 0, scale: 1 });
        });

    } else {
        console.error("GSAP Face: Missing required anchor element (#container) or elements are not ready.");
    }
});
