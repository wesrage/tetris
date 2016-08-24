import React, { PropTypes } from 'react';

const BLOCK_SIZE = 30;

const UnitBlock = ({ absolute = false, color, filled = true, x, y }) => (
   <div style={{
      backgroundColor: color,
      height: BLOCK_SIZE,
      left: x ? x * BLOCK_SIZE : 0,
      position: absolute ? 'absolute' : 'static',
      top: y ? y * BLOCK_SIZE : 0,
      visibility: filled ? 'visible' : 'hidden',
      width: 30,
   }}
      className="unit-block"
   />
);

UnitBlock.propTypes = {
   absolute: PropTypes.bool,
   color: PropTypes.string,
   filled: PropTypes.bool,
   style: PropTypes.object,
   x: PropTypes.number,
   y: PropTypes.number,
};

export default UnitBlock;
