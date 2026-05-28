/* ================================================
validerar formuläret och visar bekräftelsen när man skickar
   ================================================ */

/* väntar tills sidan är klar  */
document.addEventListener("DOMContentLoaded", function () {


    /* ================================================
       HÄMTA ALLA FÄLT OCH ELEMENT
       ================================================ */

    const formularet    = document.getElementById("kontaktFormularet");
    const skickaKnappen = document.getElementById("skickaKnappen");
    const bekraftelseRutan = document.getElementById("bekraftelseRutan");

    /* alla input-fälten */
    const namnFaltet      = document.getElementById("namnFaltet");
    const epostFaltet     = document.getElementById("epostFaltet");
    const arendeFaltet    = document.getElementById("arendeFaltet");
    const meddelandeFaltet = document.getElementById("meddelandeFaltet");
    const gdprBoxen       = document.getElementById("gdprBoxen");

    /* alla feltexter */
    const namnFelet       = document.getElementById("namnFelet");
    const epostFelet      = document.getElementById("epostFelet");
    const arendeFelet     = document.getElementById("arendeFelet");
    const meddelandeFelet = document.getElementById("meddelandeFelet");
    const gdprFelet       = document.getElementById("gdprFelet");

    /* ================================================
       VALIDERINGS-FUNKTIONER
       En funktion per fält – returnerar true om ok
       ================================================ */

    /* kollar att namnet inte är tomt */
    function valideraNamet() {
        const varde = namnFaltet.value.trim();

        if (varde === "") {
            visaFelet(namnFaltet, namnFelet);
            return false;
        }

        dolFelet(namnFaltet, namnFelet);
        return true;
    }

    /* kollar att eposten har rätt format  */
    function valideraEposten() {
        const varde = epostFaltet.value.trim();

        /* regex som kollar att det finns tecken, ett @, fler tecken, en punkt och domän */
        const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (varde === "") {
            epostFelet.textContent = "Du måste ange din e-postadress.";
            visaFelet(epostFaltet, epostFelet);
            return false;
        }

        if (!epostRegex.test(varde)) {
            epostFelet.textContent = "Eposten verkar inte stämma. Ange i formatet: namn@exempel.se";
            visaFelet(epostFaltet, epostFelet);
            return false;
        }

        dolFelet(epostFaltet, epostFelet);
        return true;
    }

    /* kollar att ärendet är valt –  ärenderad inte tom */
    function valideraArendet() {
        if (arendeFaltet.value === "") {
            visaFelet(arendeFaltet, arendeFelet);
            return false;
        }

        dolFelet(arendeFaltet, arendeFelet);
        return true;
    }

    /* kollar att meddelandet finns och är minst 10 tecken */
    function valdieraMeddelandet() {
        const varde = meddelandeFaltet.value.trim();

        if (varde === "") {
            meddelandeFelet.textContent = "Du måste skriva ett meddelande.";
            visaFelet(meddelandeFaltet, meddelandeFelet);
            return false;
        }

        if (varde.length < 10) {
            meddelandeFelet.textContent = `Meddelandet är för kort (${varde.length}/10 tecken).`;
            visaFelet(meddelandeFaltet, meddelandeFelet);
            return false;
        }

        dolFelet(meddelandeFaltet, meddelandeFelet);
        return true;
    }

    /* kollar att gdpr-boxen är ikryssad */
    function valideraGdprn() {
        if (!gdprBoxen.checked) {
            gdprFelet.classList.add("visas");
            return false;
        }

        gdprFelet.classList.remove("visas");
        return true;
    }

    /* ================================================
        visar och döljer fel
       ================================================ */

    /* visar felet och lägger röd ram på fältet */
    function visaFelet(falt, feltext) {
        falt.classList.add("har-fel");
        falt.classList.remove("ar-ok");
        feltext.classList.add("visas");
    }

    /* tar bort felet och lägger grön ram på fältet */
    function dolFelet(falt, feltext) {
        falt.classList.remove("har-fel");
        falt.classList.add("ar-ok");
        feltext.classList.remove("visas");
    }

    /* ================================================
       LIVE-VALIDERING – visar fel direkt när man lämnar fältet
       Så man inte behöver klicka skicka för att se felen
       ================================================ */

    namnFaltet.addEventListener("blur", valideraNamet);
    epostFaltet.addEventListener("blur", valideraEposten);
    arendeFaltet.addEventListener("blur", valideraArendet);
    meddelandeFaltet.addEventListener("blur", valdieraMeddelandet);

    /* uppdaterar teckenräknaren live i felmeddelandet */
    meddelandeFaltet.addEventListener("input", function () {
        const langd = meddelandeFaltet.value.trim().length;

        /* om fältet redan är markerat som fel, uppdatera texten live */
        if (meddelandeFaltet.classList.contains("har-fel") && langd > 0 && langd < 10) {
            meddelandeFelet.textContent = `Meddelandet är för kort (${langd}/10 tecken).`;
        }
    });

    /* ================================================
       SKICKA-FORMULÄRET – eventlyssnare 
       ================================================ */

    formularet.addEventListener("submit", function (e) {
        /* hindrar webbläsaren från att ladda om sidan */
        e.preventDefault();

        /* kör alla valideringar och spara resultaten */
        const namnOk      = valideraNamet();
        const epostOk     = valideraEposten();
        const arendeOk    = valideraArendet();
        const meddelandeOk = valdieraMeddelandet();
        const gdprOk      = valideraGdprn();

        /* om ett enda fält är fel, scrolla till det och avbryt */
        if (!namnOk || !epostOk || !arendeOk || !meddelandeOk || !gdprOk) {

            /* hitta det första fältet med fel och scrolla dit */
            const forstaFelet = formularet.querySelector(".har-fel, .visas");
            if (forstaFelet) {
                forstaFelet.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            return; /* avbryt här, formuläret skickas inte */
        }

        /* allt är ok – simulera att det skickas med en liten fördröjning */
        skickaKnappen.textContent = "Skickar...";
        skickaKnappen.classList.add("skickar");
        skickaKnappen.disabled = true;

        /* väntar 1.5 sekunder och visar sen bekräftelsen */
        setTimeout(function () {

            /* döljer formuläret */
            formularet.style.display = "none";

            /* visar bekräftelse-rutan */
            bekraftelseRutan.style.display = "flex";

            /* scrollar upp så bekräftelsen syns */
            bekraftelseRutan.scrollIntoView({ behavior: "smooth", block: "center" });

        }, 1500);

    });

}); 

