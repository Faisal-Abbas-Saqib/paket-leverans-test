import React, { useState, useEffect } from "react";
import "./Gomoku.css";

const checkWinner = (grid, row, col, player, size) => {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (let [dr, dc] of directions) {
    let count = 1;
    let r = row + dr;
    let c = col + dc;
    while (r >= 0 && r < size && c >= 0 && c < size && grid[r][c] === player) {
      count++;
      r += dr;
      c += dc;
    }
    r = row - dr;
    c = col - dc;
    while (r >= 0 && r < size && c >= 0 && c < size && grid[r][c] === player) {
      count++;
      r -= dr;
      c -= dc;
    }
    if (count >= 5) return true;
  }
  return false;
};

export const Gomoku = ({
  boardSize = 15,
  blackStoneColor = "#000000",
  whiteStoneColor = "#ffffff",
  boardColor = "#d4a373",
}) => {
  const [grid, setGrid] = useState([]);
  const [isBlackNext, setIsBlackNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Initialize/Reset board when size changes
  useEffect(() => {
    setGrid(
      Array(boardSize)
        .fill(null)
        .map(() => Array(boardSize).fill(null)),
    );
    setWinner(null);
    setIsBlackNext(true);
  }, [boardSize]);

  const handleClick = (r, c) => {
    if (grid[r][c] || winner) return;
    const currentPlayer = isBlackNext ? "B" : "W";
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = currentPlayer;
    setGrid(newGrid);
    if (checkWinner(newGrid, r, c, currentPlayer, boardSize))
      setWinner(currentPlayer);
    else setIsBlackNext(!isBlackNext);
  };

  return (
    <div className="gomoku-container">
      <h2 className="status-text">
        {winner
          ? `🏆 Winner: ${winner === "B" ? "Black" : "White"}`
          : `Turn: ${isBlackNext ? "Black" : "White"}`}
      </h2>

      <div
        className="gomoku-board"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 35px)`,
          backgroundColor: boardColor,
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <button
              key={`${rIdx}-${cIdx}`}
              className="gomoku-cell"
              onClick={() => handleClick(rIdx, cIdx)}
              disabled={!!winner}
            >
              {cell === "B" && (
                <div
                  className="stone stone-black"
                  style={{ backgroundColor: blackStoneColor }}
                />
              )}
              {cell === "W" && (
                <div
                  className="stone stone-white"
                  style={{ backgroundColor: whiteStoneColor }}
                />
              )}
            </button>
          )),
        )}
      </div>

      <button
        className="reset-button"
        onClick={() => {
          setGrid(
            Array(boardSize)
              .fill(null)
              .map(() => Array(boardSize).fill(null)),
          );
          setWinner(null);
          setIsBlackNext(true);
        }}
      >
        Restart Match
      </button>
    </div>
  );
};
