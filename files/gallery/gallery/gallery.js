document.addEventListener("DOMContentLoaded", () => {
   const displayDiv = document.getElementById("displayDIV");

   // Create "Previous" and "Next" buttons
   const prevButton = document.createElement("button");
   prevButton.textContent = "Previous";
   prevButton.style.position = "absolute";
   prevButton.style.left = "10px";
   prevButton.style.bottom = "20px";
   displayDiv.appendChild(prevButton);

   const nextButton = document.createElement("button");
   nextButton.textContent = "Next";
   nextButton.style.position = "absolute";
   nextButton.style.right = "10px";
   nextButton.style.bottom = "20px";
   displayDiv.appendChild(nextButton);

   // Create "Play/Pause" button
   const playPauseButton = document.createElement("button");
   playPauseButton.textContent = "Play";
   playPauseButton.style.position = "absolute";
   playPauseButton.style.left = "10px";
   playPauseButton.style.top = "20px";
   displayDiv.appendChild(playPauseButton);

   // Create "Exit" button
   const exitButton = document.createElement("button");
   exitButton.textContent = "Exit";
   exitButton.style.position = "absolute";
   exitButton.style.right = "10px";
   exitButton.style.top = "20px";
   displayDiv.appendChild(exitButton);

   // Create input field for slideshow duration
   const durationInput = document.createElement("input");
   durationInput.type = "number";
   durationInput.value = 3; // Default to 3 seconds
   durationInput.min = 1;
   durationInput.style.position = "absolute";
   durationInput.style.bottom = "20px";
   durationInput.style.left = "50%";
   durationInput.style.transform = "translateX(-50%)";
   displayDiv.appendChild(durationInput);

   const durationLabel = document.createElement("label");
   durationLabel.textContent = "seconds";
   durationLabel.style.position = "absolute";
   durationLabel.style.bottom = "20px";
   durationLabel.style.left = "calc(50% + 40px)";
   displayDiv.appendChild(durationLabel);

   // Add event listeners for navigation buttons
   prevButton.addEventListener("click", showPreviousImage);
   nextButton.addEventListener("click", showNextImage);
   playPauseButton.addEventListener("click", toggleSlideshow);
   exitButton.addEventListener("click", hideImg);

   let images = document.querySelectorAll('.gallery img');
   let currentIndex = 0;
   let slideshowInterval = null;

   // Function to display the clicked image in full screen
   function showImg(e) {
      currentIndex = Array.from(images).indexOf(e.target);
      updateDisplay();
      displayDiv.style.display = "block";
   }

   // Function to hide the full screen display
   function hideImg() {
      displayDiv.style.display = "none";
      stopSlideshow();
   }

   // Show the previous image
   function showPreviousImage(event) {
      event.stopPropagation(); // Prevent hiding the image
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
      updateDisplay();
   }

   // Show the next image
   function showNextImage(event) {
      event.stopPropagation(); // Prevent hiding the image
      currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
      updateDisplay();
   }

   // Update the display with the current image
   function updateDisplay() {
      const largeImg = displayDiv.querySelector(".bigIMG");
      const desc = displayDiv.querySelector(".desc");
      largeImg.src = images[currentIndex].dataset.large;
      desc.innerHTML = images[currentIndex].alt;
   }

   // Start the slideshow
   function startSlideshow() {
      const interval = parseInt(durationInput.value) * 1000 || 3000;
      slideshowInterval = setInterval(showNextImage, interval);
      playPauseButton.textContent = "Pause";
   }

   // Stop the slideshow
   function stopSlideshow() {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      playPauseButton.textContent = "Play";
   }

   // Toggle slideshow play/pause
   function toggleSlideshow() {
      if (slideshowInterval) {
         stopSlideshow();
      } else {
         startSlideshow();
      }
   }

   // Add event listeners to images in the gallery
   images.forEach(img => {
      img.addEventListener("click", showImg);
   });

   // Event listener to close the image on display div click
   displayDiv.addEventListener("click", hideImg);
});
