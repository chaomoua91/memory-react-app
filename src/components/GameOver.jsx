import React from "react";

const GameOver = ({ clickedName, handleRetry }) => (
  <div className="game-over-container fade-in">
    <p className="game-over-text">
      Game Over! You clicked {clickedName} twice!
    </p>
    <button className="retry-button" onClick={handleRetry}>
      Retry
    </button>
  </div>
);

export default GameOver;
