import React from "react";

const Congratulations = ({ handleRetry }) => (
  <div className="congratulations-container fade-in">
    <p className="congratulations-text">
      Congratulations! You matched all the cards!
    </p>
    <button className="retry-button" onClick={handleRetry}>
      Play Again
    </button>
  </div>
);

export default Congratulations;
