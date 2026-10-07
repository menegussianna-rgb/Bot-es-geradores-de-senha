const passwordInput = document.getElementById("password");
const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const strengthText = document.getElementById("strengthText");
const strengthProgress = document.getElementById("strengthProgress");

const copyMessage = document.getElementById("copyMessage");


const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%&*()_+-=[]{};:,.<>?";


lengthInput.addEventListener("input", () => {

    lengthValue.textContent = lengthInput.value;

    generatePassword();

});


function generatePassword() {

    let characters = "";

    if (uppercaseCheckbox.checked) {
        characters += uppercase;
    }

    if (lowercaseCheckbox.checked) {
        characters += lowercase;
    }

    if (numbersCheckbox.checked) {
        characters += numbers;
    }

    if (symbolsCheckbox.checked) {
        characters += symbols;
    }


    if (characters.length === 0) {

        passwordInput.value = "";

        strengthText.textContent = "Selecione uma opção";

        strengthProgress.style.width = "0%";

        return;
    }


    const length = Number(lengthInput.value);

    let password = "";


    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        password += characters[randomIndex];
    }


    passwordInput.value = password;

    checkStrength(password);
}


function checkStrength(password) {

    let score = 0;


    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    if (score <= 2) {

        strengthText.textContent = "Fraca";
        strengthText.style.color = "#dc2626";

        strengthProgress.style.width = "30%";
        strengthProgress.style.background = "#dc2626";

    } else if (score <= 4) {

        strengthText.textContent = "Média";
        strengthText.style.color = "#f59e0b";

        strengthProgress.style.width = "65%";
        strengthProgress.style.background = "#f59e0b";

    } else {

        strengthText.textContent = "Forte";
        strengthText.style.color = "#16a34a";

        strengthProgress.style.width = "100%";
        strengthProgress.style.background = "#16a34a";
    }
}


generateButton.addEventListener("click", () => {

    generatePassword();

});


copyButton.addEventListener("click", async () => {

    const password = passwordInput.value;

    if (!password) {
        return;
    }


    try {

        await navigator.clipboard.writeText(password);

        copyMessage.textContent = "✓ Senha copiada!";


        setTimeout(() => {

            copyMessage.textContent = "";

        }, 2000);


    } catch (error) {

        copyMessage.textContent = "Não foi possível copiar.";

    }

});


uppercaseCheckbox.addEventListener("change", generatePassword);
lowercaseCheckbox.addEventListener("change", generatePassword);
numbersCheckbox.addEventListener("change", generatePassword);
symbolsCheckbox.addEventListener("change", generatePassword);


generatePassword();
