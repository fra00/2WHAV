import React from "react";
import Square from "./Square";
import { makeMove, PLAYER_X } from "./logic/game-api";

function Board({ squares, onPlay, isXNext, isGameOver }) {
  function handleClick(i) {
    // Il giocatore umano può cliccare solo se è il suo turno ('X'),
    // la partita non è finita e la cella è vuota.
    if (!isXNext || isGameOver || squares[i]) {
      return;
    }

    const nextSquares = makeMove(squares, i, PLAYER_X);
    onPlay(nextSquares);
  }

  return (
    <div className="game-board">
      {/* Lo status è ora gestito da App.jsx */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default Board;
