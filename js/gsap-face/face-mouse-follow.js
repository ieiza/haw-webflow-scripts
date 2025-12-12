document.addEventListener('DOMContentLoaded', function() {
    
    const faceButton = document.querySelector('.face-button-v2');
    const faceContainer = document.querySelector('.face-container-v2');
    
    if (faceButton && faceContainer) {
        
        // Function to select specific inner elements for styling
        const getMouth = () => faceContainer.querySelector('.mouth-v2');
        const getEyeLeft = () => faceContainer.querySelector('.eye-v2.left');
        const getEyeRight = () => faceContainer.querySelector('.eye-v2.right');

        // --- 1. MOUSE MOVEMENT LOGIC (Handles translation) ---
        faceButton.addEventListener('mousemove', function(e) {
            
            // Get the button's boundaries (size and position)
            const rect = faceButton.getBoundingClientRect();
            
            // Calculate mouse position relative to the button (0 to width/height)
            const mouseX = e.clientX - rect.left; 
            const mouseY = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Normalize Movement (-1 to 1)
            const normalizedX = (mouseX - centerX) / centerX;
            const normalizedY = (mouseY - centerY) / centerY;
            
            // Apply movement via CSS Transform (20px max movement)
            faceButton.style.transform = `translate(${normalizedX * 20}px, ${normalizedY * 20}px)`;
            faceContainer.style.transform = `translate(${normalizedX * 10}px, ${normalizedY * 10}px)`;
        });

        // --- 2. MOUSE ENTER LOGIC (Handles expression change/hover state) ---
        faceButton.addEventListener('mouseenter', function(e) {
            // Apply the "hover" expression styles directly via JS
            getMouth().style.left = '1rem';
            getMouth().style.width = '0.5rem';
            getMouth().style.height = '0.4rem';
            getMouth().style.borderRadius = '1rem 1rem 0.125rem 0.125rem';
            
            // Apply the eye change (squint/shrink effect)
            getEyeLeft().style.height = '0.375rem';
            getEyeRight().style.height = '0.375rem';
            getEyeLeft().style.boxShadow = '0 0 0 0.25rem #fff';
            getEyeRight().style.boxShadow = '0 0 0 0.25rem #fff';
        });

        // --- 3. MOUSE LEAVE LOGIC (Resets position and expression) ---
        faceButton.addEventListener('mouseleave', function(e) {
            // Reset position
            faceButton.style.transform = 'translate(0px, 0px)';
            faceContainer.style.transform = 'translate(0px, 0px)';

            // Reset the "hover" expression styles
            getMouth().style.left = '0.8rem';
            getMouth().style.width = '1rem';
            getMouth().style.height = '0.125rem';
            getMouth().style.borderRadius = '0';
            
            // Reset the eye change
            getEyeLeft().style.height = '0.5rem';
            getEyeRight().style.height = '0.5rem';
            getEyeLeft().style.boxShadow = 'inset 1px 2px 4px #121110';
            getEyeRight().style.boxShadow = 'inset 1px 2px 4px #121110';
        });

        // --- 4. MOUSE ACTIVE LOGIC (Handles click/tap state) ---
        faceButton.addEventListener('mousedown', function(e) {
            // This allows the expression to be different on click if needed
            // For now, it will simply hold the hover state (as the logic is now handled by mouseenter/leave)
        });

    } else {
        console.error("Face Follow JS: Could not find required elements (.face-button-v2 or .face-container-v2).");
    }
});
