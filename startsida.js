const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let currentIndex = 0;

const slideNumber = document.querySelector(".slide-number");
const progressBar = document.querySelector(".progress-bar");

const slideDuration = 7000; // 5 sekunder per slide
let progress = 0; // procent för progress-bar
let progressInterval;

// Visa första bilden direkt
slides[currentIndex].classList.add("active");
slideNumber.textContent = `${currentIndex + 1} / ${totalSlides}`;

// Funktion för nästa bild
function showNextSlide() {
    // Ta bort active
    slides[currentIndex].classList.remove("active");

    // Nästa bild
    currentIndex = (currentIndex + 1) % totalSlides;
    slides[currentIndex].classList.add("active");

    // Uppdatera text
    slideNumber.textContent = `${currentIndex + 1} / ${totalSlides}`;

    // Nollställ progress
    progress = 0;
}

// Progress-bar funktion
function updateProgress() {
    progress += 100 / (slideDuration / 100); // varje 100ms
    if (progress >= 100) progress = 100;
    progressBar.style.width = `${progress}%`;
}

// Start timer
progressInterval = setInterval(updateProgress, 100); // uppdatera var 100ms

// Byt bild var slideDuration
setInterval(() => {
    showNextSlide();
}, slideDuration);

