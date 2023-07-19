// Game Structure
let FrontEnd_languages = ["html", "css", "javascript", "react"]; // Array of frontend languages to choose a random secret word
let secretWord = ""; // The secret word that the player needs to guess
let errorsLeft = 7; // Number of errors allowed before the player loses
let mistakes = 0; // Number of mistakes made by the player
let guessLetter = []; // Array to store guessed letters
let letterStatus = null; // The current status of the secret word with guessed letters

// Game logic
function randomWord() {
  secretWord =
    FrontEnd_languages[Math.floor(Math.random() * FrontEnd_languages.length)]; // Picks a random word from the FrontEnd_languages array
}

function Buttons_A_Z() {
  // Generates the HTML for buttons with letters A to Z
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
      <button
        class="btn btn-lg btn-custom-purple m-2"
        id='` +
        letter +
        `'
        onClick="wordOperator('` +
        letter +
        `')"
      >
        ` +
        letter +
        `
      </button>
    `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = buttonsHTML; // Inserts the generated buttons HTML into the "keyboard" element
}

function wordOperator(selectedLetter) {
  // Handles the logic when a letter button is clicked
  guessLetter.indexOf(selectedLetter) === -1
    ? guessLetter.push(selectedLetter)
    : null; // Adds the selected letter to the guessed letters array if it hasn't been guessed before
  document.getElementById(selectedLetter).setAttribute("disabled", true); // Disables the clicked button

  if (secretWord.indexOf(selectedLetter) >= 0) {
    // If the selected letter is part of the secret word
    guessLetterWord(); // Updates the displayed word with guessed letters
    IfGameWon(); // Checks if the game is won
  } else if (secretWord.indexOf(selectedLetter) === -1) {
    // If the selected letter is not part of the secret word
    mistakes++; // Increment the mistakes count
    updateMistakes(); // Updates the displayed mistakes count
    IfGameLost(); // Checks if the game is lost
    updateShrugmanImage(); // Updates the displayed image of "Shrugman"
    errorsLeft--; // Decrements the errors left count
  }
  document.getElementById("errorsLeft").innerHTML = errorsLeft; // Updates the displayed errors left count
}

function updateShrugmanImage() {
  // Updates the displayed image of "Shrugman" based on the number of mistakes made
  document.getElementById("shrugman_images").src = `./shrugman_images/${mistakes}.png`;
}

function IfGameWon() {
  // Checks if the game is won
  if (letterStatus === secretWord) {
    document.getElementById("keyboard").innerHTML =
      "You have Won! I guess you can live."; // Displays a message when the game is won
  }
}

function IfGameLost() {
  // Checks if the game is lost
  if (errorsLeft === 0) {
    document.getElementById("wordSpotlight").innerHTML =
      "The secretWord was: " + secretWord; // Displays the secret word when the game is lost
    document.getElementById("keyboard").innerHTML =
      "You have Lost! Sorry, but you have to die."; // Displays a message when the game is lost
    // Disable the remaining buttons if the game is lost
    const buttons = document.querySelectorAll("#keyboard button");
    buttons.forEach((button) => button.setAttribute("disabled", true));
  }
}

function guessLetterWord() {
  // Updates the displayed word with guessed letters
  letterStatus = secretWord
    .split("")
    .map((letter) => (guessLetter.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.getElementById("wordSpotlight").innerHTML = letterStatus; // Updates the displayed word with guessed letters
}

function updateMistakes() {
  // Updates the displayed mistakes count
  document.getElementsByClassName("mistakes")[0].innerHTML = mistakes;
}

function resetGame() {
  // Resets the game state and starts a new game
  mistakes = 0; // Reset the mistakes count
  guessLetter = []; // Clear the guessed letters array
  document.getElementById("shrugman_images").src = "./shrugman_images/0.png"; // Resets the "Shrugman" image
  document.getElementById("errorsLeft").innerHTML = 7; // Resets the errors left count
  errorsLeft = 7; // Reset the errors left count
  randomWord(); // Picks a new random word
  guessLetterWord(); // Resets the displayed word with guessed letters
  updateMistakes(); // Resets the displayed mistakes count
  Buttons_A_Z(); // Regenerates the letter buttons
}

// Call the 'randomWord()' function to start the game.
randomWord(); // Initializes the game by picking a random word
Buttons_A_Z(); // Initializes the letter buttons
guessLetterWord(); // Initializes the displayed word with guessed letters
