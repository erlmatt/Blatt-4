// Füge die Buttons dynamisch hinzu, wenn das Skript geladen wird
document.addEventListener("DOMContentLoaded", () => {
   const displayDiv = document.getElementById("displayDIV");

   // Erstelle die "Previous"- und "Next"-Buttons
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

   // Event-Listener für die Navigation durch die Bilder
   prevButton.addEventListener("click", showPreviousImage);
   nextButton.addEventListener("click", showNextImage);
});

let images = document.querySelectorAll('.gallery img');
let currentIndex = 0;

// Funktion zum Anzeigen des Bildes in voller Größe
function showImg(e) {
  const displayDiv = document.getElementById("displayDIV");
  const largeImg = displayDiv.querySelector(".bigIMG");
  
  currentIndex = Array.from(images).indexOf(e.target);
  largeImg.src = e.target.dataset.large;
  displayDiv.querySelector(".desc").innerHTML = e.target.alt;
  displayDiv.style.display = "block";
}

// Funktion zum Verbergen des Bildes
function hideImg(e) {
  e.currentTarget.style.display = "none";
}

// Zeige das vorherige Bild an
function showPreviousImage(event) {
   event.stopPropagation(); // Verhindert, dass das Bild ausgeblendet wird
   currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
   updateDisplay();
}

// Zeige das nächste Bild an
function showNextImage(event) {
   event.stopPropagation(); // Verhindert, dass das Bild ausgeblendet wird
   currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
   updateDisplay();
}

// Aktualisiere die Anzeige auf das aktuelle Bild
function updateDisplay() {
   const displayDiv = document.getElementById("displayDIV");
   const largeImg = displayDiv.querySelector(".bigIMG");
   const desc = displayDiv.querySelector(".desc");
   
   largeImg.src = images[currentIndex].dataset.large;
   desc.innerHTML = images[currentIndex].alt;
}

// Event-Listener für Bilder in der Galerie
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", showImg);
}

// Event-Listener, um das Bild durch Klick auf das Display-DIV zu schließen
document.getElementById("displayDIV").addEventListener("click", hideImg);

