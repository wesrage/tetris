import React from 'react';
import TetrominoBlock from './TetrominoBlock';
import { TetrominoType } from '../types';
import { BLOCK_SIZE } from '../constants';

const Tetromino = ({ type, rotation = 0, position }) => (
   <div
      className="tetromino"
      style={{
         left: position[0] * BLOCK_SIZE,
         top: position[1] * BLOCK_SIZE,
      }}
   >
      {blockPositionMap[type][rotation].map((blockPosition, index) => (
         <TetrominoBlock
            key={`active-block-${index}`}
            type={type}
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
      [[0, 0], [1, 0], [1, 1], [2, 1]],
      [[2, 0], [1, 1], [1, 2], [2, 1]],
      [[0, 1], [1, 1], [1, 2], [2, 2]],
      [[1, 0], [1, 1], [0, 1], [0, 2]],
   ],
};

export function getGridPositions(tetromino) {
   const blockPositions = blockPositionMap[tetromino.type][tetromino.rotation];
   return blockPositions.map(position =>
      position.map((value, index) => value + tetromino.position[index]));
}

Tetromino.propTypes = TetrominoType;

export default Tetromino;
