import { PropTypes } from 'react';

export const tetrominoTypes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export const TetrominoType = PropTypes.shape({
   types: PropTypes.oneOf(tetrominoTypes),
   position: PropTypes.arrayOf(PropTypes.number).isRequired,
});
