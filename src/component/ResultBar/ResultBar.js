import React from "react";

//css
import "./styles.css";

const ResultBar = ({ currentScore, possibleHighest, lowestScore }) => {
  // Quiz result bar component
  return (
    <div className='resultBarContainer'>
      <div className='progressBarWrapper'>
        <div class='progressPercentage'>
          <div>Score: {Math.floor(currentScore)}%</div>
          <div>Max Score: {Math.floor(possibleHighest)}%</div>
        </div>
        <div class='progress'>
          <div
            class='custom-progress-bar custom-progress-bar-success'
            role='progressbar'
            style={{ width: `${Math.floor(lowestScore)}%` }}
          />
          <div
            class='custom-progress-bar custom-progress-bar-completed'
            role='progressbar'
            style={{ width: `${Math.floor(currentScore)}%` }}
          />
          <div
            class='custom-progress-bar custom-progress-bar-need-finish'
            role='progressbar'
            style={{ width: `${Math.floor(possibleHighest)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultBar;
