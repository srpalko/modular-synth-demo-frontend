
let submit = document.querySelector("#submit");
let mailingList = [];

/* Event listener for email form */
submit.addEventListener("click", (e) => {
    let emailForm = document.querySelector(".email-form");
    e.preventDefault();
    let email = document.querySelector("#newsletter-email").value;

    /* Check that email is not already in the list and that something has been entered*/
    if (mailingList.indexOf(email) === -1 && email !== "") {

        mailingList.push(email);
        let h3 = document.createElement("h3");
        h3.innerHTML = "Email added to the mailing list. Thanks!";
        emailForm.appendChild(h3);
        let phone = document.querySelector("#sonic-telephone").value;
        let phoneMessage = "";
        if (phone !== null && telephoneCheck(phone)) {
            phoneMessage = "Phone number accepted";
        } else if (phone !== null && !telephoneCheck(phone)) {
            phoneMessage = "Invalid phone format";
        }
        let element = document.createElement("h3");
        element.innerHTML = phoneMessage;
        emailForm.appendChild(element);
    }
});

let chooser = document.querySelector("#chooser");

/* Event listener for the random synth chooser */
chooser.addEventListener("click", () => {
    let choices = document.querySelectorAll("input[name='synth-type']");
    let checked = "";
    for (let choice of choices) {
        if (choice.checked) {
            checked = choice;
        }
    }
    let randomSynth = synths.randomChoice(checked.id);
    let randomDisplay = document.querySelector("#random-display");
    randomDisplay.textContent = "Try the " + randomSynth + "!";
});

/* Object with data on various synth models */
const synths = {
    buchla: ["Model 100 Series", "Series 200"],
    moog: ["Minimoog", "Polymoog", "Taurus", "Memorymoog", "Modular"],
    dsi: ["Prophet-5", "Prophet '08", "Prophet Rev 2"],
    yamaha: ["DX7", "DX7II", "DX1", "TX81Z", "DX-11", "DX-1"],
    roland: ["TB-303", "Jupiter-8", "Juno-6", "JD-800", "Juno-106", "Juno-60", "SH-1000"],
    korg: ["Wavestation", "M1", "PS-3300"],
    ppg: ["Wave"],
    oberheim: ["OB-Xa"],

    randomChoice(synthBrand) {
        let pick = Math.floor(Math.random() * this[synthBrand].length);
        return this[synthBrand][pick];
    }
}

/* Function that verifies whether a phone number is a legal US phone number */
function telephoneCheck(str) {
    if (str.length > 16) {
        return false;
    }
    let nonDigitCheck = /[^\d-()\s]/;
    if (nonDigitCheck.test(str) === true) {
        return false;
    }
    let digits = str.match(/\d/g);
    if (digits.length > 11 || digits.length < 10) {
        return false;
    }
    if (digits.length === 11 && digits[0] !== 1) {
        return false;
    }
    let parenthesisCheckA = str.match(/[(]/);
    let parenthesisCheckB = str.match(/[)]/);
    if (parenthesisCheckA != null) {
        let pLocationA = parenthesisCheckA.index;
        return str.charAt(pLocationA + 4) === ")";
    }
    if (parenthesisCheckB != null) {
        let pLocationB = parenthesisCheckB.index;
        return str.charAt(pLocationB - 4) !== "(";
    }
    return true;
}




