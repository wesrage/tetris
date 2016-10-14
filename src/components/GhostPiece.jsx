import React from 'react';
import GhostBlock from './GhostBlock';
import BaseTetromino from './BaseTetromino';
import { blockPositionMap } from './Tetromino';
import { TetrominoType } from '../types';

const GhostPiece = ({ type, rotation, position }) => (
   <BaseTetromino position={position}>
      {blockPositionMap[type][rotation].map((blockPosition, index) => (
         <GhostBlock
            key={`active-block-${index}`}
            type={type}
            position={blockPosition}
         />
      ))}
   </BaseTetromino>
);

GhostPiece.propTypes = TetrominoType;

export default GhostPiece;
