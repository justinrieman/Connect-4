import React from "react";

function Cell(props) {
  function handleClick() {
    props.dropPiece(props.y);
  }

  const x = props.x;
  const y = props.y;
  const board = props.board;
  let classes = "";

  if (board[y][x] !== undefined) {
    if (board[y][x] === "red") {
      classes = "circle-red";
    } else if (board[y][x] === "yellow") {
      classes = "circle-yellow";
    }
  }

  return (
    <div className="cell" onClick={handleClick}>
      <div className={classes} />
    </div>
  );
}

export default Cell;
