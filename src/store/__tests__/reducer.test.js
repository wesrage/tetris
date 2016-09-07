import {
   INITIALIZE,
   DROP,
   DEPLOY,
   LOCK,
   MOVE,
   HOLD,
   ROTATE,
   SET_FAST_DROP,
   // TOGGLE_PAUSE,
} from '../types';
import reducer from '../reducer';

const initialState = {
   active: {
      type: 'J',
      position: [3, 2],
      rotation: 0,
   },
   grid: [],
   queue: ['T', 'L'],
   hold: null,
   dropInterval: 1000,
   paused: false,
};

describe(DROP, () => {
   it('increases y-position of active Tetromino by one', () => {
      const action = { type: DROP };
      const expectedState = {
         ...initialState,
         active: {
            ...initialState.active,
            position: [3, 3],
         },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });
});

describe(DEPLOY, () => {
   it('sets the active Tetromino from the front of the queue', () => {
      const action = { type: DEPLOY, bag: [] };
      const expectedState = {
         ...initialState,
         active: {
            type: 'T',
            position: [3, 0],
            rotation: 0,
         },
         queue: ['L'],
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });

   it('adds a new Tetromino bag to the back of the queue', () => {
      const action = { type: DEPLOY, bag: ['O', 'Z', 'T'] };
      const expectedState = {
         ...initialState,
         active: {
            type: 'T',
            position: [3, 0],
            rotation: 0,
         },
         queue: ['L', 'O', 'Z', 'T'],
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });
});

describe(HOLD, () => {
   it('moves the active Tetromino to the hold slot', () => {

   });

   it('makes the hold piece active if it exists', () => {

   });

   it('sets the active Tetromino from the front of the queue if no hold piece exists', () => {

   });
});

describe(INITIALIZE, () => {

});

describe(LOCK, () => {

});

describe(MOVE, () => {

});

// describe(TOGGLE_PAUSE, () => {
//
// });

describe(ROTATE, () => {
   it('increments the active rotation state mod 4 if rotation is counterclockwise', () => {

   });

   it('decrements the active rotation state mod 4 if rotation is clockwise', () => {

   });
});

// describe(SEND_TO_BOTTOM, () => {
//
// });

describe(SET_FAST_DROP, () => {
   it('sets fastDrop to given action value', () => {

   });
});
