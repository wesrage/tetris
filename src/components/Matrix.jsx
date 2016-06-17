import React, { PropTypes } from 'react';
import UnitBlock from './UnitBlock';

const blockSize = 30;

const MatrixRow = ({ cells, key }) => (
   <div style={{ height: blockSize }}>
      {cells.map((cell, index) => (
         <UnitBlock
            key={`${key},${index}`}
            filled={!!cell}
            color={cell}
            size={blockSize}
         />
      ))}
   </div>
);

MatrixRow.propTypes = {
   cells: PropTypes.arrayOf(PropTypes.string),
};


const matrixStyle = {
   backgroundColor: '#222',
   border: '10px solid #aaa',
   display: 'inline-block',
};

const Matrix = ({ grid }) => (
   <div style={matrixStyle}>
      {grid.map((cells, index) => (
         <MatrixRow key={index} cells={cells}/>
      ))}
   </div>
);

Matrix.propTypes = {
   grid: PropTypes.arrayOf(PropTypes.arrayOf(
      PropTypes.string,
   )),
};

Matrix.defaultProps = {
   grid: [],
};

export default Matrix;
