import React from 'react';
import GhostBlock from './GhostBlock';
import { blockPositionMap } from './Tetromino';
import { TetrominoType } from '../types';
import { BLOCK_SIZE } from '../constants';

const GhostPiece = ({ type, rotation, position }) => (
   <div
      className="ghost-piece"
      style={{
         left: position[0] * BLOCK_SIZE,
         top: position[1] * BLOCK_SIZE,
      }}
   >
      {blockPositionMap[type][rotation].map((blockPosition, index) => (
         <GhostBlock
            key={`active-block-${index}`}
            type={type}
            position={blockPosition}
         />
      ))}
   </div>
);

GhostPiece.propTypes = TetrominoType;

export default GhostPiece;
