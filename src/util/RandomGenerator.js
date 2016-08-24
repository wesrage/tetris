const PIECE_TYPES = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

// export default class RandomGenerator {
//    currentBag = [];
//
//    constructor({ queueSize }) {
//       this.queueSize = queueSize;
//    }
//
//    readQueue() {
//       if (this.currentBag.length < this.queueSize) {
//          this.currentBag.concat(generateBag());
//       }
//       return this.currentBag.slice(this.queueSize);
//    }
// }

export function generateBag() {
   return shuffle(PIECE_TYPES);
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
