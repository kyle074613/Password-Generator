var generateButton = document.querySelector("#generate-btn");
var copyButton = document.querySelector("#copy-btn");
var passwordBox = document.querySelector("#password-box");

var specChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
var upperCaseChars = lowerCaseChars.toUpperCase();
var numericChars = "0123456789";
var lowerCaseChoice = false;
var upperCaseChoice = false;
var numericCharsChoice = false;
var specCharChoice = false;

copyButton.disabled = true;

//Asks user for password preferences
function getPasswordPreferences() {
    lowerCaseChoice = confirm("Generate password with: lower case characters?");
    upperCaseChoice = confirm("Generate password with: upper case characters?");
    numericCharsChoice = confirm("Generate password with: numbers?");
    specCharChoice = confirm("Generate password with: special characters?");
}

//Populates list of characters to use for password generation
function getPossibleCharacters() {
    var charList = "";

    if (lowerCaseChoice)
        charList += lowerCaseChars;

    if (upperCaseChoice)
        charList += upperCaseChars;

    if (numericCharsChoice)
        charList += numericChars;

    if (specCharChoice)
        charList += specChars;

    return charList;
}

//Generates the password when the "Generate Password" button is clicked
function generatePassword() {
    getPasswordPreferences();

    //Checks if user set any password character preferences
    if (!lowerCaseChoice && !upperCaseChoice && !numericCharsChoice && !specCharChoice) {
        alert("You must pick at least one character type to generate a password.");
        return
    }

    //Creates an array of possible characters for password generation
    var possibleCharacters = getPossibleCharacters().split("");

    //Asks user for password length then checks if input is valid
    var passwordLength = parseInt(prompt("Set your password length (must be between 8 and 128 characters)."));

    if (isNaN(passwordLength)) {
        alert("Cannot generate password (invalid password length).");
        return;
    }
    else if (passwordLength < 8) {
        alert("Cannot generate password (password is too short).");
        return;
    }
    else if (passwordLength > 128) {
        alert("Cannot generate password (password is too long).");
        return;
    }

    //Generates password
    var generatedPassword = ""
    for (var i = 0; i < passwordLength; i++) {
        generatedPassword += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
    }

    //Sets text in the text box to the generated password and enables copy button
    passwordBox.textContent = generatedPassword;
    copyButton.disabled = false;
}

//Copies generated passowrd to clipboard
function copyPassword() {
    passwordBox.select();
    document.execCommand('copy');
    alert("Password copied to clipboard!");
}

generateButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);