import Board from "./components/Board";

const board = new Board();

const whackedSpan = document.querySelector(".whacked-count");
const missedSpan = document.querySelector(".missed-count");

let whacked = 0;
let missed = 0;

whackedSpan.textContent = whacked;
missedSpan.textContent = missed;

let row;
let column;
let gameInterval;

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}

function putCharacter() {
    row = generateRandomNumber();
    column = generateRandomNumber();

    board.field[row][column] = board.character;
    board.render();
}

function moveCharacter() {
    let newRow = generateRandomNumber();
    let newColumn = generateRandomNumber();

    if (board.field[row][column] !== board.field[newRow][newColumn]) {
        board.clear();
        row = newRow;
        column = newColumn;
        board.field[row][column] = board.character;
    }

    board.render();
}

function startGame() {
    board.clear();
    whacked = 0;
    missed = 0;
    whackedSpan.textContent = whacked;
    missedSpan.textContent = missed;

    putCharacter();

    gameInterval = setInterval(() => {
        moveCharacter();
    }, 1000);
}

function endGame() {
    const gameOver = document.querySelector(".game-over");
    gameOver.classList.add("active");

    clearInterval(gameInterval);

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
        whacked = whacked + 1;
        whackedSpan.textContent = whacked;
        moveCharacter();
    } else {
        missed = missed + 1;
        missedSpan.textContent = missed;

        if (missed >= 5) {
            endGame();
        }
    }
});