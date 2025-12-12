document.addEventListener('DOMContentLoaded', function() {
    
    const faceButton = document.querySelector('.face-button-v2');
    const faceContainer = document.querySelector('.face-container-v2');
    
    if (faceButton && faceContainer) {
        
        faceButton.addEventListener('mousemove', function(e) {
            
            // 1. Get the button's boundaries (size and position)
            const rect = faceButton.getBoundingClientRect();
            
            // 2. Calculate mouse position relative to the button (0 to width/height)
            // e.clientX/Y is mouse position relative to the viewport
            const mouseX = e.clientX - rect.left; 
            const mouseY = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // 3. Normalize Movement (-1 to 1) based on center offset
            const normalizedX = (mouseX - centerX) / centerX;
            const normalizedY = (mouseY - centerY) / centerY;
            
            // 4. Apply movement via CSS Transform (20px max movement)
            // Use CSS variables for smooth interaction with CSS hover styles
            
            // Apply movement to the outer button
            faceButton.style.transform = `translate(${normalizedX * 20}px, ${normalizedY * 20}px)`;

            // Apply movement to the inner face container
            faceContainer.style.transform = `translate(${normalizedX * 10}px, ${normalizedY * 10}px)`;

        });

        faceButton.addEventListener('mouseleave', function(e) {
            // Reset position on mouse leave to return to 0,0
            faceButton.style.transform = 'translate(0px, 0px)';
            faceContainer.style.transform = 'translate(0px, 0px)';
        });

    } else {
        console.error("Face Follow JS: Could not find required elements (.face-button-v2 or .face-container-v2).");
    }
});
