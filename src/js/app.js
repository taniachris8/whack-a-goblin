import Board from "./components/Board";

const board = new Board();

const whackedSpan = document.querySelector(".whacked-count");
const missedSpan = document.querySelector(".missed-count");

let whacked = 0;
let missed = 0;

whackedSpan.textContent = whacked;
missedSpan.textContent = missed;

let characterPosition;
let wasClicked = false;
const maxNumberOfMisses = 5;
let moveTimeout;


function generateRandomNumber() {
    return Math.floor(Math.random() * board.field.length);
}

function putCharacter() {
    characterPosition = generateRandomNumber();
    wasClicked = false;
    board.field[characterPosition] = board.character;
    board.render();
}

function moveCharacter() {
    if (!wasClicked) {
        missed = missed + 1;
        missedSpan.textContent = missed;

        if (missed >= maxNumberOfMisses) {
            endGame();
            return;
        }
    }

    let newCharacterPosition;

    do {
        newCharacterPosition = generateRandomNumber();
    } while (newCharacterPosition === characterPosition);

    board.field[characterPosition] = "";
    characterPosition = newCharacterPosition;
    board.field[characterPosition] = board.character;
    board.render();

    wasClicked = false;

    moveTimeout = setTimeout(moveCharacter, 1000);
}

function startGame() {
    clearTimeout(moveTimeout);
    board.clear();
    whacked = 0;
    missed = 0;
    whackedSpan.textContent = whacked;
    missedSpan.textContent = missed;

    putCharacter();
   
    moveTimeout = setTimeout(moveCharacter, 1000);
}


function endGame() {
    clearTimeout(moveTimeout);
    const gameOver = document.querySelector(".game-over");
    gameOver.classList.add("active");

    const button = document.querySelector("button");
    button.addEventListener("click", () => {
        gameOver.classList.remove("active");
        startGame();
    });
}

window.addEventListener("load", () => {
    startGame();
});


board.boardContainer.addEventListener("click", (event) => {
    const item =
      event.target.tagName === "IMG"
          ? event.target.closest(".cell")
          : event.target.closest(".cell");
     
    if (!item) return;

    if (item.querySelector("img")) {
        wasClicked = true;
        whacked = whacked + 1;
        whackedSpan.textContent = whacked;

        board.field[characterPosition] = "";
        board.render();

        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(moveCharacter, 0);
    } 
});

