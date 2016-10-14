import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';

const GameOverScreen = ({ onRestart }) => (
   <div className="aligner game-panel__screen game-over-screen">
      <div className="aligner__item">
         <div>GAME OVER</div>
         <div className="restart">
            <span className="restart__link" onClick={onRestart}>
               <Icon name="play"/>
               <span
                  style={{ marginLeft: '1em' }}
                  onClick={onRestart}
               >Play Again</span>
            </span>
         </div>
      </div>
   </div>
);

GameOverScreen.propTypes = {
   onRestart: PropTypes.func.isRequired,
};

export default GameOverScreen;
