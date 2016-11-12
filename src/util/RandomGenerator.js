import { tetrominoTypes } from '../types';

export function generateBag() {
   return shuffle(tetrominoTypes);
}

function shuffle(array) {
   const _array = array.slice();
   for (let i = _array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = _array[i];
      _array[i] = _array[j];
      _array[j] = temp;
   }
   return _array;
}
