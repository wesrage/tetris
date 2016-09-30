import React, { PropTypes } from 'react';
import Tetromino from './Tetromino';

const QueueDisplay = ({ queue }) => (
    <div className="queue-display">
        {queue.map((piece, index) => (
            <div key={`${piece}-${index}`} className="queue-display__piece">
                <Tetromino type={piece} position={[0, 0]}/>
            </div>
        ))}
    </div>
);

QueueDisplay.propTypes = {
   queue: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QueueDisplay;
