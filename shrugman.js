// Game Structure
let FrontEnd_languages = ["html", "css", "javascript", "react"];
let secretWord = "";
let errorsLeft = 7;
let mistakes = 0;
let guessLetter = [];
let letterStatus = null;

// Game logic
function randomWord() {
  secretWord =
    FrontEnd_languages[Math.floor(Math.random() * FrontEnd_languages.length)];
}

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

function updateShrugmanImage() {
  document.getElementById("shrugman_images").src = `./shrugman_images/${mistakes}.png`;
}

function IfGameWon() {
  if (letterStatus === secretWord) {
    document.getElementById("keyboard").innerHTML =
      "You have Won! I guess you can live.";
  }
}

function IfGameLost() {
  if (errorsLeft === 0) {
    document.getElementById("wordSpotlight").innerHTML =
      "The secretWord was: " + secretWord;
    document.getElementById("keyboard").innerHTML =
      "You have Lost! Sorry, but you have to die.";
    // Disable the remaining buttons if the game is lost
    const buttons = document.querySelectorAll("#keyboard button");
    buttons.forEach((button) => button.setAttribute("disabled", true));
  }
}

function guessLetterWord() {
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
  mistakes = 0;
  guessLetter = [];
  document.getElementById("shrugman_images").src = "./shrugman_images/0.png";
  document.getElementById("errorsLeft").innerHTML = 7;
  errorsLeft = 7;
  randomWord();
  guessLetterWord();
  updateMistakes();
  Buttons_A_Z();
}

// Call the 'randomWord()' function to start the game.
randomWord();
Buttons_A_Z();
guessLetterWord();
