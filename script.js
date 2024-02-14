const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startGame");
const homeButton = document.getElementById("homeButton");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const modeSelector = document.querySelectorAll('input[name="mode"]');
const message = document.getElementById("message");
let currentPlayer = "X";
let gameOver = false;
let currentMode = "human";

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameOver = true;
      cells[a].style.color = "red";
      cells[b].style.color = "red";
      cells[c].style.color = "red";
      message.textContent = `${currentPlayer} wins!`;
      break;
    }
  }
  if (!gameOver && Array.from(cells).every((cell) => cell.textContent)) {
    gameOver = true;
    message.textContent = "It's a draw!";
  }
}

function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (!cell.textContent && !gameOver) {
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (!gameOver && currentMode === "ai") {
      setTimeout(aiMove, 500);
    }
  }
}

function aiMove() {
  const availableCells = Array.from(cells).filter((cell) => !cell.textContent);
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  availableCells[randomIndex].textContent = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  checkWinner();
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.color = "#F2C14E";
  });
  currentPlayer = "X";
  gameOver = false;
  message.textContent = "";
}

function setGameMode() {
  currentMode = this.value;
}

function goToHomeScreen() {
  homeScreen.style.display = "flex";
  gameScreen.style.display = "none";
  restartGame();
}

startButton.addEventListener("click", () => {
  homeScreen.style.display = "none";
  gameScreen.style.display = "block";
  board.style.display = "grid";
  restartButton.style.display = "block";
});

homeButton.addEventListener("click", goToHomeScreen);

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
modeSelector.forEach((mode) => mode.addEventListener("change", setGameMode));
