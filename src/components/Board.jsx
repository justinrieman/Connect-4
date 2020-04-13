import React, { useState } from "react";
import Cell from "./Cell";

const theBoard = [
  [], // col 0
  [], // col 1
  [], // col 2
  [], // col 3
  [], // col 4
  [], // col 5
  [] // col 6
];

function Board() {
  const [board, setBoard] = useState(theBoard);
  const [player, setPlayer] = useState("red");

  function newGame() {
    setBoard(theBoard);
    setPlayer("red");
  }

  function changePlayer(current) {
    current === "red" ? setPlayer("yellow") : setPlayer("red");
  }

  function dropPiece(column) {
    if (board[column].length < 6) {
      const newColumn = board[column].concat(player);
      const newBoard = board.slice();
      newBoard[column] = newColumn;
      setBoard(newBoard);
      changePlayer(player);
    }
  }

  let winner = checkAll(board);

  function checkAll(board) {
    return (
      checkVertical(board) ||
      checkDiagonalRight(board) ||
      checkDiagonalLeft(board) ||
      checkHorizontal(board)
    );
  }

  function checkHorizontal(board) {
    for (let r = 3; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  function checkVertical(board) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  function checkDiagonalRight(board) {
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  function checkDiagonalLeft(board) {
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  const cells = [];

  for (let y = 0; y < 7; y++) {
    const row = [];
    for (let x = 5; x >= 0; x--) {
      row.push(
        <Cell key={x} x={x} y={y} board={board} dropPiece={dropPiece} />
      );
    }
    cells.push(
      <div key={y} className="row">
        {row}
      </div>
    );
  }

  return (
    <div>
      <h1 className="title">Connect 4</h1>
      <div className="turn">
        <div className={"circle-" + player} />
      </div>
      <div className="board">{cells}</div>
      <button className="button" onClick={newGame}>
        New Game
      </button>
      <h1 className="winner">
        {winner === "red"
          ? "Red Wins!"
          : winner === "yellow"
          ? "Yellow Wins!"
          : null}
      </h1>
    </div>
  );
}

export default Board;
