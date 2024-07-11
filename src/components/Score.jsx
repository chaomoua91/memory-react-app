import React from "react";

const Score = ({ score, bestScore }) => (
  <div className="score-container">
    <p>Score: {score}</p>
    <p>Best Score: {bestScore}</p>
  </div>
);

export default Score;
