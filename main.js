let players;
let stepCounter = 0;
let markedCells;
// let's get the game cells first
const c00 = document.querySelector(".c00");
const c01 = document.querySelector(".c01");
const c02 = document.querySelector(".c02");
const c10 = document.querySelector(".c10");
const c11 = document.querySelector(".c11");
const c12 = document.querySelector(".c12");
const c20 = document.querySelector(".c20");
const c21 = document.querySelector(".c21");
const c22 = document.querySelector(".c22");
// it's nice to have all the cells in a single list
const allCells = [c00, c01, c02, c10, c11, c12, c20, c21, c22];
const restart = document.querySelector("#restart");

let gameGrid = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function bindEvents() {
  // let's bind callbacks to each of the game cells.
  c00?.addEventListener("click", (e) => handleGameCellClick(c00, 0, 0));
  c01?.addEventListener("click", (e) => handleGameCellClick(c01, 0, 1));
  c02?.addEventListener("click", (e) => handleGameCellClick(c02, 0, 2));
  c10?.addEventListener("click", (e) => handleGameCellClick(c10, 1, 0));
  c11?.addEventListener("click", (e) => handleGameCellClick(c11, 1, 1));
  c12?.addEventListener("click", (e) => handleGameCellClick(c12, 1, 2));
  c20?.addEventListener("click", (e) => handleGameCellClick(c20, 2, 0));
  c21?.addEventListener("click", (e) => handleGameCellClick(c21, 2, 1));
  c22?.addEventListener("click", (e) => handleGameCellClick(c22, 2, 2));
  restart.addEventListener("click", (e) => restartGame());
  console.log("calllack binding complete");
}

function askWhoStarts() {
  let starter = null;
  let message = null;
  while (starter != "X" && starter != "O") {
    starter = prompt(
      `${message != null ? message : ""} Who should start? X or O?`
    );
    console.log(starter);
    message = "Please enter a valid value.";
  }
  if (starter == "X") {
    players = ["X", "O"];
  } else {
    players = ["O", "X"];
  }
}

function handleGameCellClick(cell, row, col) {
  // let's write on the clicked cell
  cell.innerHTML = players[stepCounter % 2];
  // let's populate the game grid
  gameGrid[row][col] = players[stepCounter % 2];
  let end = checkWinner();
  stepCounter++;
  return end;
}

function checkWinner() {
  // loop 8 times to check all the possible winning axes ...
  if (
    gameGrid[0][0] != null &&
    gameGrid[0][0] == gameGrid[0][1] &&
    gameGrid[0][0] == gameGrid[0][2]
  )
    return endGame(c00, c01, c02);
  else if (
    gameGrid[1][0] != null &&
    gameGrid[1][0] == gameGrid[1][1] &&
    gameGrid[1][0] == gameGrid[1][2]
  )
    return endGame(c10, c11, c12);
  else if (
    gameGrid[2][0] != null &&
    gameGrid[2][0] == gameGrid[2][1] &&
    gameGrid[2][0] == gameGrid[2][2]
  )
    return endGame(c20, c21, c22);
  else if (
    gameGrid[0][0] != null &&
    gameGrid[0][0] == gameGrid[1][0] &&
    gameGrid[0][0] == gameGrid[2][0]
  )
    return endGame(c00, c10, c20);
  else if (
    gameGrid[0][1] != null &&
    gameGrid[0][1] == gameGrid[1][1] &&
    gameGrid[0][1] == gameGrid[2][1]
  )
    return endGame(c01, c11, c21);
  else if (
    gameGrid[0][2] != null &&
    gameGrid[0][2] == gameGrid[1][2] &&
    gameGrid[0][2] == gameGrid[2][2]
  )
    return endGame(c02, c12, c22);
  else if (
    gameGrid[0][0] != null &&
    gameGrid[0][0] == gameGrid[1][1] &&
    gameGrid[0][0] == gameGrid[2][2]
  )
    return endGame(c00, c11, c22);
  else if (
    gameGrid[0][2] != null &&
    gameGrid[0][2] == gameGrid[1][1] &&
    gameGrid[0][2] == gameGrid[2][0]
  )
    return endGame(c02, c11, c20);
  else return false;
}

function endGame(cell1, cell2, cell3) {
  //say who won the game
  alert(`${players[stepCounter % 2]} has won the game!`);
  // mark the wining axis
  markedCells = [cell1, cell2, cell3];
  markedCells.forEach((value, index) => {
    value.classList.add("marked-cell");
  });
}

function restartGame() {
  // reset player preceedence
  players = [];
  askWhoStarts();

  // reset game-grid
  gameGrid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  // reset visible grid
  allCells.forEach((value, index) => {
    value.classList.remove("marked-cell");
    value.innerHTML = "";
  });
  stepCounter = 0;
}

function main() {
  bindEvents();
  askWhoStarts();
}

main();
