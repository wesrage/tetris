import React, { PropTypes } from 'react';

const style = {
   border: '1px solid rgba(255, 255, 255, 0.5)',
   display: 'inline-block',
};

const UnitBlock = ({ filled, color, size }) => (
   <div style={{
      ...style,
      backgroundColor: color,
      height: size,
      width: size,
      visibility: filled ? 'visible' : 'hidden',
   }} className="unit-block"
   />
);

UnitBlock.propTypes = {
   color: PropTypes.string,
   filled: PropTypes.bool.isRequired,
   size: PropTypes.number.isRequired,
};

export default UnitBlock;
