// This function contains the entire p5.js sketch logic
function sketch(p) {
    
    // Constants for the face
    const HEAD_SIZE = 250;
    const EYE_RADIUS = 20;
    const PUPIL_RADIUS = 10;
    
    // Variables for eye movement
    let faceCenter;
    let eyeLeftCenter, eyeRightCenter;

    // --- p5.js Setup Function ---
    p.setup = function() {
        let container = document.getElementById('face-container');
        
        // **DIMENSION FIX:** Use a minimum size (like 100x100) if dimensions are initially 0, 
        // otherwise use the reported dimensions. This prevents an invisible 0x0 canvas.
        let w = container.offsetWidth > 0 ? container.offsetWidth : 500;
        let h = container.offsetHeight > 0 ? container.offsetHeight : 500;
        
        let canvas = p.createCanvas(w, h);
        
        // Attach the canvas to the container Div Block
        canvas.parent('face-container');
        
        p.angleMode(p.DEGREES);
        
        faceCenter = p.createVector(p.width / 2, p.height / 2);

        // **RESIZE FIX:** Immediately call resize to force the canvas to match the parent
        // after the initial creation, fixing potential Webflow timing issues.
        p.windowResized(); 
    };

    // --- p5.js Draw Loop ---
    p.draw = function() {
        p.background(255); // White background
        
        // 1. Draw the Head (Black Circle)
        p.noStroke();
        p.fill(0);
        p.ellipse(faceCenter.x, faceCenter.y, HEAD_SIZE, HEAD_SIZE);
        
        // 2. Define Eye Positions relative to the Head Center
        eyeLeftCenter = p.createVector(faceCenter.x - 50, faceCenter.y - 30);
        eyeRightCenter = p.createVector(faceCenter.x + 50, faceCenter.y - 30);
        
        // 3. Draw and Move the Eyes
        drawEye(eyeLeftCenter);
        drawEye(eyeRightCenter);
        
        // Draw the Mouth (Simple arc/curve)
        p.stroke(255);
        p.strokeWeight(3);
        p.noFill();
        p.arc(faceCenter.x, faceCenter.y + 40, 100, 50, 0, 180);
    };
    
    // Function to draw a single eye and move its pupil
    function drawEye(eyePosition) {
        let mouseVector = p.createVector(p.mouseX - eyePosition.x, p.mouseY - eyePosition.y);
        let angle = mouseVector.heading();
        
        let maxDistance = EYE_RADIUS - PUPIL_RADIUS;
        
        let pupilX = eyePosition.x + p.cos(angle) * maxDistance;
        let pupilY = eyePosition.y + p.sin(angle) * maxDistance;
        
        // Draw the white eyeball
        p.fill(255);
        p.ellipse(eyePosition.x, eyePosition.y, EYE_RADIUS * 2, EYE_RADIUS * 2);
        
        // Draw the black pupil
        p.fill(0);
        p.ellipse(pupilX, pupilY, PUPIL_RADIUS * 2, PUPIL_RADIUS * 2);
    }
    
    // --- Handle Window Resize (Used immediately after setup) ---
    p.windowResized = function() {
        let container = document.getElementById('face-container');
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        faceCenter = p.createVector(p.width / 2, p.height / 2);
    }
}

// ==========================================================
// EXECUTION LOGIC (Timing Fix)
// ==========================================================

// This ensures the sketch runs only after the p5.js library and the HTML are fully loaded.
window.onload = function() {
    // Only run if the p5 object is available (it may not be if the CDN failed)
    if (typeof p5 !== 'undefined') { 
        let myp5 = new p5(sketch);
    }
};
