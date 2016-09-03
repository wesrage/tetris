import { PropTypes } from 'react';

export const tetrominoTypes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export const TetrominoType = {
   type: PropTypes.oneOf(tetrominoTypes),
   position: PropTypes.arrayOf(PropTypes.number).isRequired,
   rotation: PropTypes.oneOf([0, 1, 2, 3]),
};
