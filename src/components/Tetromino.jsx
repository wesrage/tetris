import React, { PropTypes } from 'react';
import TetrominoBlock from './TetrominoBlock';
import { tetrominoTypes } from '../types';

const BLOCK_SIZE = 30;

const Tetromino = ({ type, rotation, position }) => (
   <div style={{
      left: position[0] * BLOCK_SIZE,
      top: position[1] * BLOCK_SIZE,
   }}
      className="tetromino"
   >
      {blockPositionMap[type][rotation].map((blockPosition, index) => (
         <TetrominoBlock
            key={`active-block-${index}`}
            color={getColor(type)}
            position={blockPosition}
         />
      ))}
   </div>
);

const blockPositionMap = {
   I: [
      [[0, 1], [1, 1], [2, 1], [3, 1]],
      [[2, 0], [2, 1], [2, 2], [2, 3]],
      [[0, 2], [1, 2], [2, 2], [3, 2]],
      [[1, 0], [1, 1], [1, 2], [1, 3]],
   ],
   J: [
      [[0, 0], [0, 1], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [1, 2]],
      [[0, 1], [1, 1], [2, 1], [2, 2]],
      [[1, 0], [1, 1], [1, 2], [0, 2]],
   ],
   L: [
      [[0, 1], [1, 1], [2, 1], [2, 0]],
      [[1, 0], [1, 1], [1, 2], [2, 2]],
      [[0, 1], [1, 1], [2, 1], [0, 2]],
      [[0, 0], [1, 0], [1, 1], [1, 2]],
   ],
   O: [
      [[1, 0], [2, 0], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [2, 1]],
   ],
   S: [
      [[1, 0], [2, 0], [0, 1], [1, 1]],
      [[1, 0], [1, 1], [2, 1], [2, 2]],
      [[1, 1], [2, 1], [0, 2], [1, 2]],
      [[0, 0], [0, 1], [1, 1], [1, 2]],
   ],
   T: [
      [[1, 0], [0, 1], [1, 1], [2, 1]],
      [[1, 0], [1, 1], [2, 1], [1, 2]],
      [[0, 1], [1, 1], [2, 1], [1, 2]],
      [[1, 0], [0, 1], [1, 1], [1, 2]],
   ],
   Z: [
      [[0, 0], [1, 0], [1, 1], [1, 2]],
      [[2, 0], [1, 1], [1, 2], [2, 1]],
      [[1, 0], [1, 1], [2, 1], [2, 2]],
      [[0, 1], [1, 0], [1, 1], [2, 0]],
   ],
};

function getColor(type) {
   return 'red';
}

export function calculateTetrominoWidth(tetromino) {
   const blockPositions = blockPositionMap[tetromino.type][tetromino.rotation];
   const xPositions = blockPositions.map(position => position[0]);
   return Math.max.apply(0, xPositions);
}

// const Tetrominos = [I, J, L, O, S, T, Z];

Tetromino.propTypes = {
   type: PropTypes.oneOf(tetrominoTypes),
   position: PropTypes.arrayOf(PropTypes.number).isRequired,
   rotation: PropTypes.oneOf([0, 1, 2, 3]),
};

export default Tetromino;
