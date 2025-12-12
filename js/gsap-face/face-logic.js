document.addEventListener('DOMContentLoaded', function() {
    
    const faceButton = document.querySelector('.face-button');
    const faceContainer = document.querySelector('.face-container');
    const containerCoords = document.querySelector('#container');
    
    if (containerCoords && faceButton && faceContainer) {
        
        // --- MOUSE MOVE LISTENER (Button Movement) ---
        faceButton.addEventListener('mousemove', function(e) {
          
          // **NEW CALCULATION:** Get mouse position relative to the button itself (0 to width/height)
          const rect = faceButton.getBoundingClientRect();
          const mouseX = e.clientX - rect.left; // Mouse X relative to the button's left edge
          const mouseY = e.clientY - rect.top;   // Mouse Y relative to the button's top edge
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Calculate normalized movement (-1 to 1) based on center offset
          const normalizedX = (mouseX - centerX) / rect.width;
          const normalizedY = (mouseY - centerY) / rect.height;
          
          // Apply movement to the Button (50px max movement)
          gsap.to(faceButton, {
              duration: 0.3, 
              x: normalizedX * 50,
              y: normalizedY * 50,
              ease: "power4.out"
            });
            
          // Apply movement to the Face Container (25px max movement)
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
