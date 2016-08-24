import React, { PropTypes } from 'react';
import UnitBlock from './UnitBlock';

const TetrominoBlock = ({ color, position }) => (
   <UnitBlock
      absolute
      color={color}
      filled
      x={position[0]}
      y={position[1]}
   />
);

TetrominoBlock.propTypes = {
   color: PropTypes.string,
   position: PropTypes.arrayOf(PropTypes.number),
};

export default TetrominoBlock;
