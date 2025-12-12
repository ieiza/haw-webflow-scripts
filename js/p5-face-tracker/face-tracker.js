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
        // Find the container div on the Webflow page using its ID
        let container = document.getElementById('face-container');
        
        // Create the canvas, setting its size to the parent container's size
        let canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
        
        // Attach the canvas to the container Div Block
        canvas.parent('face-container');
        
        p.angleMode(p.DEGREES); // Set angle mode for easier math
        
        // Calculate the face's center point (center of the canvas)
        faceCenter = p.createVector(p.width / 2, p.height / 2);
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
        // Find the mouse vector relative to the eye center
        let mouseVector = p.createVector(p.mouseX - eyePosition.x, p.mouseY - eyePosition.y);
        
        // Calculate the angle from the eye to the mouse
        let angle = mouseVector.heading();
        
        // Clamp the distance of the pupil movement to the edge of the eye (radius - pupil_radius)
        let maxDistance = EYE_RADIUS - PUPIL_RADIUS;
        
        // Calculate the pupil position based on the angle and maximum distance
