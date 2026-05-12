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

 
 