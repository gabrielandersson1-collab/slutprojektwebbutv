const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let currentIndex = 0;
let progress = 0;

const slideNumber = document.querySelector(".slide-number");
const progressBar = document.querySelector(".progress-bar");

const slideDuration = 7000; // 5 sekunder per slide
let progressInterval;

// Visa första bilden direkt
slides[currentIndex].classList.add("active");
slideNumber.textContent = `${currentIndex + 1} / ${totalSlides}`;
progressBar.style.height = `${progress}%`;

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
   progress += 100 / (slideDuration / 100);

    if (progress >= 100) {
         progressBar.style.height = `0%`;
        progress = 0; // startar om direkt utan att “fastna”
    } 
    else{
        progressBar.style.height = `${progress}%`;
    }

    
}

// Start timer
progressInterval = setInterval(updateProgress, 100); // uppdatera var 100ms

// Byt bild var slideDuration
setInterval(() => {
    showNextSlide();
}, slideDuration);




/* ------------------------------------------------
       HAMBURGAR-MENY 
       ------------------------------------------------ */

    const hamburgarKnapp = document.getElementById("hamburgarKnapp");
    const mobilMeny = document.getElementById("mobilMeny");

    /* Kolla att elementen finns på sidan */
    if (hamburgarKnapp && mobilMeny) {

        /* Öppna/stäng menyn vid klick på hamburgar-knappen */
        hamburgarKnapp.addEventListener("click", function () {
            hamburgarKnapp.classList.toggle("oppen");
            mobilMeny.classList.toggle("oppen");

            /* Uppdatera aria-attributen för tillgänglighet */
            const arMenyOppen = mobilMeny.classList.contains("oppen");
            hamburgarKnapp.setAttribute("aria-expanded", arMenyOppen);
            mobilMeny.setAttribute("aria-hidden", !arMenyOppen);
        });

        /* Stäng menyn om man klickar utanför den */
        document.addEventListener("click", function (event) {
            const klickadeUtanfor = !hamburgarKnapp.contains(event.target) && !mobilMeny.contains(event.target);

            if (klickadeUtanfor && mobilMeny.classList.contains("oppen")) {
                hamburgarKnapp.classList.remove("oppen");
                mobilMeny.classList.remove("oppen");
                hamburgarKnapp.setAttribute("aria-expanded", false);
                mobilMeny.setAttribute("aria-hidden", true);
            }
        });
    }

 /* slut på DOMContentLoaded */