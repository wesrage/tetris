import React, { PropTypes } from 'react';
import UnitBlock from './UnitBlock';
import { TetrominoType } from '../types';

const GhostBlock = ({ type, position }) => (
   <UnitBlock
      absolute
      type={type}
      outlined
      x={position[0]}
      y={position[1]}
   />
);

GhostBlock.propTypes = {
   position: PropTypes.arrayOf(PropTypes.number),
   type: TetrominoType.type,
};

export default GhostBlock;
