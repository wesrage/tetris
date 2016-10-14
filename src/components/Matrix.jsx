import React, { PropTypes } from 'react';
import styled from 'styled-components';
import UnitBlock from './UnitBlock';
import { BLOCK_SIZE } from '../constants';

const MatrixRowRoot = styled.div`
   height: ${BLOCK_SIZE}px;
`;

const MatrixRow = ({ cells, rowIndex }) => (
   <MatrixRowRoot>
      {cells.map((cell, index) => (
         <UnitBlock
            key={`${rowIndex},${index}`}
            filled={!!cell}
            type={cell}
         />
      ))}
   </MatrixRowRoot>
);

MatrixRow.propTypes = {
   cells: PropTypes.arrayOf(PropTypes.string),
   rowIndex: PropTypes.number,
};

const Matrix = ({ grid, children }) => (
   <div>
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
   children: PropTypes.node,
};

Matrix.defaultProps = {
   grid: [],
};

export default Matrix;
