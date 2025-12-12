document.addEventListener('DOMContentLoaded', function() {
    
    // ELEMENTS ARE SELECTED INSIDE THE LISTENER, GUARANTEEING THEY EXIST
    const faceButton = document.querySelector('.face-button');
    const faceContainer = document.querySelector('.face-container');
    const containerCoords = document.querySelector('#container');
    
    // Ensure elements are found before proceeding
    if (containerCoords && faceButton && faceContainer) {
        
        // NOW GET THE COORDINATES, GUARANTEED TO BE CORRECT AFTER DOMContentLoaded
        const mouseCoords = containerCoords.getBoundingClientRect();
        
        // Use the correct offset calculation method for GSAP:
        const containerOffsetX = containerCoords.getBoundingClientRect().left;
        const containerOffsetY = containerCoords.getBoundingClientRect().top;


        faceButton.addEventListener('mousemove', function(e) {
          // Use e.clientX/Y (relative to viewport) and subtract the container's screen offset
          const mouseX = e.clientX - containerOffsetX;
          const mouseY = e.clientY - containerOffsetY;
          
          gsap.to(faceButton, {
              duration: 0.3, 
              // The logic here is correct, but the inputs (mouseX, mouseY) need to be reliable
              x: (mouseX - mouseCoords.width / 2) / mouseCoords.width * 50,
              y: (mouseY - mouseCoords.height / 2) / mouseCoords.width * 50,
              ease: "power4.out"
            });
        });

        // (The rest of your event listeners for mousemove, mouseenter, mouseleave...)

        faceButton.addEventListener('mousemove', function(e) {
            // ... (your existing logic for faceContainer movement)
            const mouseX = e.clientX - containerOffsetX;
            const mouseY = e.clientY - containerOffsetY;
            
            gsap.to(faceContainer, {
                duration: 0.3, 
                x: (mouseX - mouseCoords.width / 2) / mouseCoords.width * 25,
                y: (mouseY - mouseCoords.height / 2) / mouseCoords.width * 25,
                ease: "power4.out"
            });
        });

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
