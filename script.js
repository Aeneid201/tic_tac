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
const playerOneDiv = document.querySelector(".playerOne");
const playerTwoDiv = document.querySelector(".playerTwo");
let gameOver = false;
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

  if (
    !el.classList.contains("singleGrid") ||
    el.classList.contains("marked") ||
    gameOver
  )
    return;
  el.style.backgroundImage = `url('${currentPlayer.marker}')`;
  el.classList.add("marked");
  let id = el.getAttribute("data-id");
  gameBoard[id] = currentPlayer.name;
  checkWinner();
  switchPlayer();
});

replayBtn.addEventListener("click", replay);
resetBtn.addEventListener("click", reset);
startBtn.addEventListener("click", initPlayers);

function initPlayers() {
  let initPlayer1 = document.querySelector(".playerOne .selected");
  let initPlayer2 = document.querySelector(".playerTwo .selected");

  if (!initPlayer1 || !initPlayer2) return;

  player1 = new Player(
    initPlayer1.getAttribute("data-character"),
    initPlayer1.getAttribute("data-src")
  );

  player2 = new Player(
    initPlayer2.getAttribute("data-character"),
    initPlayer2.getAttribute("data-src")
  );

  currentPlayer = player1;
  intro.classList.add("d-none");
  tic.classList.remove("d-none");
}

playerOneDiv.addEventListener("click", function (e) {
  let el = e.target;
  document.querySelectorAll(".playerOne div").forEach((div) => {
    div.classList.remove("selected");
  });
  el.closest("div").classList.add("selected");
});

playerTwoDiv.addEventListener("click", function (e) {
  let el = e.target;
  document.querySelectorAll(".playerTwo div").forEach((div) => {
    div.classList.remove("selected");
  });
  el.closest("div").classList.add("selected");
});

function checkWinner() {
  for (let i = 0; i < winningCombo.length; i++) {
    if (
      gameBoard[winningCombo[i][0]] === currentPlayer.name &&
      gameBoard[winningCombo[i][1]] === currentPlayer.name &&
      gameBoard[winningCombo[i][2]] === currentPlayer.name
    ) {
      winner = currentPlayer;
      gameOver = true;
      displayWinner();
    }
  }
}

function switchPlayer() {
  if (currentPlayer === player1) currentPlayer = player2;
  else currentPlayer = player1;
}

function reset() {
  gameOver = false;
  currentPlayer = player1;
  gameBoard = [];
  singleGrid.forEach((el) => {
    el.style.backgroundImage = "";
    el.classList.remove("marked");
  });
}

function replay() {
  reset();
  winnerDiv.classList.add("d-none");
  inner.classList.remove("d-none");
}

function displayWinner() {
  winnerTitle.textContent = `The winner is : ${winner.name}`;
  winnerDiv.classList.remove("d-none");
}

class Player {
  constructor(name, marker, wins = 0) {
    this.name = name;
    this.marker = marker;
    this.wins = wins;
  }
}
