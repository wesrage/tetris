import React, { PropTypes } from 'react';
import UnitBlock from './UnitBlock';
import { TetrominoType } from '../types';

const TetrominoBlock = ({ type, position }) => (
   <UnitBlock
      absolute
      type={type}
      filled
      x={position[0]}
      y={position[1]}
   />
);

TetrominoBlock.propTypes = {
   position: PropTypes.arrayOf(PropTypes.number),
   type: TetrominoType.type,
};

export default TetrominoBlock;
