const parallax_el = document.querySelectorAll(".parallax");

    let xVal = 0, yVal = 0;

    // Function to update the parallax effect based on mouse or device orientation
    function updateParallax() {
      parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        el.style.transform = `translateX(calc(-50% + ${xVal * speedx}px)) translateY(calc(-50% + ${yVal * speedy}px))`;
      });
    }

    // Add an event listener for the 'mouseover' event
    window.addEventListener("mousemove", (e) => {
      xVal = e.clientX - window.innerWidth / 2;
      yVal = e.clientY - window.innerHeight / 2;
      updateParallax();
    });

    // Add an event listener for the 'deviceorientation' event
    window.addEventListener('deviceorientation', (event) => {
      const beta = event.beta; // Get the device's beta (tilt front-to-back) angle
      const gamma = event.gamma; // Get the device's gamma (tilt left-to-right) angle

      // Calculate the x and y values based on device orientation
      xVal = gamma * 3;
      yVal = beta * 3;
      updateParallax();
    });

    // Prevent scrolling on mobile devices when tilting
    document.body.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });