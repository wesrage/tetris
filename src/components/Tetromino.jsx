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
      {getBlockPositions(type, rotation).map((blockPosition, index) => (
         <TetrominoBlock
            key={`active-block-${index}`}
            color={getColor(type)}
            position={blockPosition}
         />
      ))}
   </div>
);

function getBlockPositions(type, rotation) {
   switch (type) {
      case 'I':
         if (rotation % 2) {
            return [[0, 0], [0, 1], [0, 2], [0, 3]];
         }
         return [[0, 0], [1, 0], [2, 0], [3, 0]];
      case 'J':
      case 'L':
      case 'O':
         return [[0, 0], [0, 1], [1, 0], [1, 1]];
      case 'S':
      case 'T':
      case 'Z':
      default:
         return [[0, 0], [0, 1], [1, 0], [1, 1]];
   }
}

function getColor(type) {
   return 'red';
}

export function calculateTetrominoWidth(tetromino) {
   const blockPositions = getBlockPositions(tetromino.type, tetromino.rotation);
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
