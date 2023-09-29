"use strict";

const startBtn = document.querySelector(".start");
const player1_name = document.querySelector(".player1_name");
const player1_marker = document.querySelector(".player1_marker");
const player2_name = document.querySelector(".player2_name");
const player2_marker = document.querySelector(".player2_marker");
const tic = document.querySelector(".tic");
const intro = document.querySelector(".intro");
const grid = document.querySelector(".grid");
const singleGrid = document.querySelectorAll(".singleGrid");
const resetBtn = document.querySelector(".reset");
const winnerDiv = document.querySelector(".winner");
const winnerTitle = document.querySelector(".winner h1");
const inner = document.querySelector(".tic .inner");
const replayBtn = document.querySelector(".replay");
const winningCombo = [
  [0, 1, 2],
  [0, 4, 8],
  [2, 5, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [3, 4, 5],
  [6, 7, 8],
];
let gameBoard = [];
let player1,
  player2,
  currentPlayer,
  winner = {};

grid.addEventListener("click", (e) => {
  let el = e.target;
  if (!el.classList.contains("singleGrid") || el.classList.contains("marked"))
    return;
  el.textContent = currentPlayer.marker;
  let id = el.getAttribute("data-id");
  gameBoard[id - 1] = currentPlayer.marker;
  checkWinner();
  switchPlayer();
});

replayBtn.addEventListener("click", replay);
startBtn.addEventListener("click", verifyInfo);
resetBtn.addEventListener("click", reset);

function checkWinner() {
  singleGrid.forEach(el, () => {
    if (el.textContent === "") return;
  });

  for (let i = 0; i < winningCombo.length; i++) {
    if (
      gameBoard[winningCombo[i][0]] === currentPlayer.marker &&
      gameBoard[winningCombo[i][1]] === currentPlayer.marker &&
      gameBoard[winningCombo[i][2]] === currentPlayer.marker
    ) {
      winner = currentPlayer;
      displayWinner();
    }
  }
}

function switchPlayer() {
  if (currentPlayer === player1) currentPlayer = player2;
  else currentPlayer = player1;
}

function reset() {
  currentPlayer = player1;
  gameBoard = [];
  singleGrid.forEach((el) => {
    el.textContent = "";
    el.classList.remove("marked");
  });
}

function replay() {
  reset();
  winnerDiv.classList.add("d-none");
  inner.classList.remove("d-none");
}

function verifyInfo() {
  if (
    player1_marker.value &&
    player1_name.value &&
    player2_name.value &&
    player2_marker.value &&
    player1_name.value !== player2_name.value &&
    player1_marker.value !== player2_marker.value
  ) {
    player1 = new Player(player1_name.value, player1_marker.value);
    player2 = new Player(player2_name.value, player2_marker.value);
    currentPlayer = player1;
    tic.classList.remove("d-none");
    intro.classList.add("d-none");
  } else {
    alert("Names & markers must be unique");
  }
}

function displayWinner() {
  winnerTitle.textContent = winner.name;
  inner.classList.add("d-none");
  winnerDiv.classList.remove("d-none");
}

class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }
}
