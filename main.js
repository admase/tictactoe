/**
 * Tic-Tac-Toe Project
 */

"use strict";

// PlayerFactory
const player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};

const playerOne = player("Player 1", "X");
const playerTwo = player("Player 2", "O");

// Controller Module
const gameController = (() => {

  const startBtn = document.getElementById("startBtn");
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // Tic-Tac-Toe gameboard
  const getBoard = () => gameboard;

  // Event Listener to manage user's click (or move).
  const getBoardCells = () => {
    document.querySelectorAll(".board-cell").forEach((cell, index) => {
      cell.innerHTML = "";
      cell.addEventListener("click", handlePlayerClick.bind(null, cell, index));
    });
  };

  // Handle Player Click - identifies each player's turn and marker placement
  const handlePlayerClick = (cell, index) => {
    let playerTurn = DOMController.getPlayerTurn("turn");
    const cellValue = cell.innerHTML;

    if (cellValue === "") {
      if (playerTurn.innerHTML === playerOne.getName()) {
        cell.innerHTML = playerOne.getSymbol();
        playerTurn.innerHTML = playerTwo.getName();

        board[Math.floor(index / 3)][index % 3] = playerOne.getSymbol();
      } else {
        cell.innerHTML = playerTwo.getSymbol();
        playerTurn.innerHTML = playerOne.getName();

        board[Math.floor(index / 3)][index % 3] = playerTwo.getSymbol();
      }
    }
    cell.removeEventListener("click", handlePlayerClick);
    checkWinner();
  };

  // Check Winner - loops through every possible winning combination to verify the winner
  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] !== ""
      ) {
        showResult(board[i][0]);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== ""
      ) {
        showResult(board[0][i]);
        return;
      }
    }

    // Check for diagonals
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== ""
    ) {
      showResult(board[0][0]);
      return;
    }

    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== ""
    ) {
      showResult(board[0][2]);
      return;
    }

    // Check for a tie
    let count = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] != "") {
          count++;
        }
      }
    }

    if (count == 9) {
      showResult("It's a Tie!");
      return;
    }
  };

  // Show Result - display the winner or a tie game
  const showResult = (symbol) => {
    let playerResult = DOMController.getResult("result");
    if (symbol === playerOne.getSymbol()) {
      playerResult.innerHTML = playerOne.getName() + " Wins!";
    } else if (symbol === playerTwo.getSymbol()) {
      playerResult.innerHTML = playerTwo.getName() + " Wins!";
    } else {
      playerResult.innerHTML = "Tie Game!";
    }
    playerResult.style.display = "flex";
  };

  // Reset - sets the game to default mode
  const reset = () => {
    document.getElementById("result").style.display = "none";
    document.getElementById("turn").innerHTML = "Player 1";
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    getBoardCells();
  };

  startBtn.addEventListener("click", reset);

  return { getBoard };
})();

// Creates the gameboard
let board = gameController.getBoard();
console.log(board);

// DOM Module
const DOMController = (() => {

  // Checks player's turn
  const getPlayerTurn = (id) => {
    const el = document.getElementById(id);
    return el;
  };

  // Display results
  const getResult = (id) => {
    const el = document.getElementById(id);
    return el;
  };

  return { getPlayerTurn, getResult };
})();
