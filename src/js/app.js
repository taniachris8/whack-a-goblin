import goblinImage from "../img/goblin.png";

let board = [];

for (let i = 0; i < 4; i++) {
  board.push(["", "", "", ""]);
}

function clearBoard() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = "";
    }
  }
}

let character = "x";
let row;
let column;

function generateRandomNumber() {
  return Math.floor(Math.random() * 4);
}

function putCharacter() {
  row = generateRandomNumber();
  column = generateRandomNumber();

  board[row][column] = character;
  renderBoard();
}

function moveCharacter() {
  let newRow = generateRandomNumber();
  let newColumn = generateRandomNumber();

  if (board[row][column] !== board[newRow][newColumn]) {
    clearBoard();
    row = newRow;
    column = newColumn;
    board[row][column] = character;
  }

  renderBoard();
}

function renderBoard() {
  const boardContainer = document.querySelector(".board");
  boardContainer.innerHTML = "";

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = board[i][j];
      boardContainer.append(cell);

      if (cell.textContent === character) {
        cell.textContent = "";
        const goblin = document.createElement("img");
        goblin.alt = "x";
        goblin.classList.add("goblin");
        goblin.src = goblinImage;
        cell.append(goblin);
      }
    }
  }
}

window.addEventListener("load", () => {
  putCharacter();
});

setInterval(() => {
  moveCharacter();
}, 2000);
