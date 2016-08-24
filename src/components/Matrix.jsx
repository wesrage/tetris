import React, { PropTypes } from 'react';
import UnitBlock from './UnitBlock';

const MatrixRow = ({ cells, rowIndex }) => (
   <div>
      {cells.map((cell, index) => (
         <UnitBlock
            key={`${rowIndex},${index}`}
            filled={!!cell}
            color={cell}
         />
      ))}
   </div>
);

MatrixRow.propTypes = {
   cells: PropTypes.arrayOf(PropTypes.string),
   rowIndex: PropTypes.number,
};

const Matrix = ({ grid, children }) => (
   <div className="matrix">
      {grid.map((cells, index) => (
         <MatrixRow key={index} rowIndex={index} cells={cells}/>
      ))}
      {children}
   </div>
);

Matrix.propTypes = {
   grid: PropTypes.arrayOf(PropTypes.arrayOf(
      PropTypes.string,
   )),
   children: PropTypes.element,
};

Matrix.defaultProps = {
   grid: [],
};

export default Matrix;
