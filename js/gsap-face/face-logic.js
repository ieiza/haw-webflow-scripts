document.addEventListener('DOMContentLoaded', function() {
    
    // ELEMENTS SELECTED AFTER DOM IS READY
    const faceButton = document.querySelector('.face-button');
    const faceContainer = document.querySelector('.face-container');
    const containerCoords = document.querySelector('#container'); // The HTML element
    
    // Only proceed if all elements are found
    if (containerCoords && faceButton && faceContainer) {
        
        // Get the initial dimensions and offsets
        const mouseCoords = containerCoords.getBoundingClientRect();

        // **FIX:** Use offsetLeft/Top for document-relative position
        const containerOffsetX = containerCoords.offsetLeft;
        const containerOffsetY = containerCoords.offsetTop;
        
        // --- MOUSE MOVE LISTENER (Button Movement) ---
        faceButton.addEventListener('mousemove', function(e) {
          // Use e.pageX/Y (mouse position relative to the document)
          // and subtract the container's document offset (containerOffsetX/Y)
          const mouseX = e.pageX - containerOffsetX;
          const mouseY = e.pageY - containerOffsetY;
          
          gsap.to(faceButton, {
              duration: 0.3, 
              // Calculation logic based on offset:
              x: (mouseX - mouseCoords.width / 2) / mouseCoords.width * 50,
              y: (mouseY - mouseCoords.height / 2) / mouseCoords.width * 50,
              ease: "power4.out"
            });
        });

        // --- MOUSE MOVE LISTENER (Inner Face Movement) ---
        faceButton.addEventListener('mousemove', function(e) {
            const mouseX = e.pageX - containerOffsetX;
            const mouseY = e.pageY - containerOffsetY;
            
            gsap.to(faceContainer, {
                duration: 0.3, 
                x: (mouseX - mouseCoords.width / 2) / mouseCoords.width * 25,
                y: (mouseY - mouseCoords.height / 2) / mouseCoords.width * 25,
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
