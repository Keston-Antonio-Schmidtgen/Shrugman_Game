//// Game Structure ////

let FrontEnd_languages = ["html", "css", "javascript", "react"]; // An array of Words that will be taken randomly, when the player tries to figure out the secretWord.

let secretWord = ""; // This will be a string to store the word selected randomly.
let errorsLeft = 7;
let mistakes = 0;
let guessLetter = []; // An Empty array that stores each letter. It will show the player each selected leter,to avoid clicking the same letter twice.
let letterStatus = null;

//// Game logic ////

function randomWord() {
  // This function will call a radom word to be solved
  secretWord =
    FrontEnd_languages[Math.floor(Math.random() * FrontEnd_languages.length)];
}

//// This function allows the player to select a letter via Keyboard ////
function Buttons_A_Z() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
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

  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

function wordOperator(selectedLetter) {
  // This function shows the current Letter the player guessed correctly
  guessLetter.indexOf(selectedLetter) === -1
    ? guessLetter.push(selectedLetter)
    : null;
  document.getElementById(selectedLetter).setAttribute("disabled", true);

  if (secretWord.indexOf(selectedLetter) >= 0) {
    guessLetterWord();
    IfGameWon();
  } else if (secretWord.indexOf(selectedLetter) === -1) {
    mistakes++;
    updateMistakes();
    IfGameLost();
    updateShrugmanImage();
    errorsLeft--;
  }
  document.getElementById("errorsLeft").innerHTML = errorsLeft;
}
//// Game Status ////

function updateShrugmanImage() {
  // This function will call a shrugman body part image for every wrong selection.
  "./shrugman_images/" + mistakes + ".png";
}

function IfGameWon() {
  // This function will determine if the player that thy have won.
  if (letterStatus === secretWord) {
    document.getElementById("keyboard").innerHTML =
      "You have Won! I guess you can live.";
  }
}

function IfGameLost() {
  // This function will determine if the player that they have lost/die.
  if (errorsLeft == 1) {
    document.getElementById("wordSpotlight").innerHTML =
      "The secretWord was: " + secretWord;
    document.getElementById("keyboard").innerHTML =
      "You have Lost! Sorry, but you have to die.";
  }
}

function guessLetterWord() {
  // This function will show how many letters the player have to figure. If a letter hasn't been selected it will represent an underscore "_"
  letterStatus = secretWord
    .split("")
    .map((letter) => (guessLetter.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.getElementById("wordSpotlight").innerHTML = letterStatus;
}

function updateMistakes() {
  document.getElementsByClassName("mistakes")[0].innerHTML = mistakes;
}

function resetGame() {
  // This function will reset the game.
  mistakes = 0;
  guessLetter = [];
  document.getElementById("shrugman_images").src = "./images/0.png";
  document.getElementById("errorsLeft").innerHTML = 7;
  errorsLeft = 7;
  randomWord();
  guessLetterWord();
  updateMistakes();
  Buttons_A_Z();
}

randomWord();
Buttons_A_Z();
guessLetterWord();
