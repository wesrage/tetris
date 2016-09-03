import React, { PropTypes } from 'react';
import UnitBlock from './UnitBlock';
import { BLOCK_SIZE } from '../constants';

const MatrixRow = ({ cells, rowIndex }) => (
   <div style={{ height: BLOCK_SIZE }}>
      {cells.map((cell, index) => (
         <UnitBlock
            key={`${rowIndex},${index}`}
            filled={!!cell}
            type={cell}
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
         <MatrixRow
            key={index}
            cells={cells}
            rowIndex={index}
         />
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
