const faceButton = document.querySelector('.face-button');
const faceContainer = document.querySelector('.face-container');
const containerCoords = document.querySelector('#face-container');

// Ensure the containerCoords element is found before getting BoundingClientRect
if (containerCoords && faceButton && faceContainer) {
    const mouseCoords = containerCoords.getBoundingClientRect();

    faceButton.addEventListener('mousemove', function(e) {
      const mouseX = e.pageX - containerCoords.offsetLeft;
      const mouseY = e.pageY - containerCoords.offsetTop;

      // Note: Using TweenMax (GSAP 2) which is deprecated, but we'll use the v3 syntax equivalent
      // For simplicity, we assume you load a v3 compatible CDN below
      gsap.to(faceButton, {
          duration: 0.3, 
          x: (mouseX - mouseCoords.width / 2) / mouseCoords.width * 50,
          y: (mouseY - mouseCoords.height / 2) / mouseCoords.width * 50,
          ease: "power4.out"
        });
    });

    faceButton.addEventListener('mousemove', function(e) {
      const mouseX = e.pageX - containerCoords.offsetLeft;
      const mouseY = e.pageY - containerCoords.offsetTop;

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
    console.error("GSAP Face: Missing required anchor elements (face-button or #container).");
}
