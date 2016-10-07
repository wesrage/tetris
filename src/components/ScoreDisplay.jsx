import React, { PropTypes } from 'react';
import DisplayValue from './DisplayValue';

const ScoreDisplay = ({ level, score }) => (
   <div className="score-display">
      <DisplayValue title="Level">{level}</DisplayValue>
      <DisplayValue title="Score">{score}</DisplayValue>
   </div>
);

ScoreDisplay.propTypes = {
   level: PropTypes.number.isRequired,
   score: PropTypes.number.isRequired,
};

export default ScoreDisplay;
