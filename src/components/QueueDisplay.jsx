import React, { PropTypes } from 'react';
import Tetromino, { getDimensions } from './Tetromino';

const QueueDisplay = ({ queue }) => (
   <div className="queue-display">
      {queue.map((piece, index) => {
         const dimensions = getDimensions({ type: piece, rotation: 0 });
         const position = [
            (dimensions.width === 3) ? 0.5 : 0,
            (dimensions.height > 1) ? 0.5 : 0,
         ];
         return (
           <div key={`${piece}-${index}`} className="queue-display__piece">
              <Tetromino type={piece} position={position}/>
           </div>
         );
      })}
   </div>
);

QueueDisplay.propTypes = {
   queue: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QueueDisplay;
