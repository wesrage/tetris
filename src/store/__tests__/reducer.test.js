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
import {
   HEIGHT,
   WIDTH,
} from '../../constants';
import reducer, { emptyGrid } from '../reducer';

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
   fastDrop: false,
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
   it('sets the active Tetromino from the front of the queue if no hold piece exists', () => {
      const action = { type: HOLD };
      const expectedState = {
         ...initialState,
         active: {
            type: 'T',
            position: [3, 0],
            rotation: 0,
         },
         hold: 'J',
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });

   it('swaps the active Tetromino and the hold piece if one exists', () => {
      const modifiedInitialState = {
         ...initialState,
         hold: 'Z',
      };
      const action = { type: HOLD };
      const expectedState = {
         ...modifiedInitialState,
         active: {
            type: 'Z',
            position: [3, 0],
            rotation: 0,
         },
         hold: 'J',
      };
      expect(reducer(modifiedInitialState, action)).toEqual(expectedState);
   });
});

describe(INITIALIZE, () => {
   it('sets up a fresh queue', () => {
      const action = {
         type: INITIALIZE,
         bag: ['T', 'L', 'Z', 'S', 'I', 'O', 'J'],
      };
      const expectedState = {
         ...initialState,
         queue: ['T', 'L', 'Z', 'S', 'I', 'O', 'J'],
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });
});

describe(LOCK, () => {
   it('makes the blocks of the active tetromino become part of the game grid', () => {
      const action = { type: LOCK };
      const modifiedInitialState = {
         ...initialState,
         grid: emptyGrid(HEIGHT, WIDTH),
         active: {
            ...initialState.active,
            position: [4, 3],
         },
      };
      const expectedGrid = emptyGrid(HEIGHT, WIDTH);
      expectedGrid[3][4] = 'J';
      expectedGrid[4][4] = 'J';
      expectedGrid[4][5] = 'J';
      expectedGrid[4][6] = 'J';
      const expectedState = {
         ...modifiedInitialState,
         grid: expectedGrid,
      };
      expect(reducer(modifiedInitialState, action)).toEqual(expectedState);
   });
});

describe(MOVE, () => {
   it('increments the active x position if movement is to the right', () => {
      const action = { type: MOVE, right: true };
      const expectedState = {
         ...initialState,
         active: {
            ...initialState.active,
            position: [4, 2],
         },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });

   it('decrements the active x position if movement is to the left', () => {
      const action = { type: MOVE };
      const expectedState = {
         ...initialState,
         active: {
            ...initialState.active,
            position: [2, 2],
         },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });
});

// describe(TOGGLE_PAUSE, () => {
//
// });

describe(ROTATE, () => {
   it('decrements the active rotation state mod 4 if rotation is clockwise', () => {
      const action = { type: ROTATE };
      const expectedState = {
         ...initialState,
         active: {
            ...initialState.active,
            rotation: 3,
         },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });

   it('increments the active rotation state mod 4 if rotation is counterclockwise', () => {
      const action = { type: ROTATE, counterClockwise: true };
      const expectedState = {
         ...initialState,
         active: {
            ...initialState.active,
            rotation: 1,
         },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
   });
});

// describe(SEND_TO_BOTTOM, () => {
//
// });

describe(SET_FAST_DROP, () => {
   it('sets fastDrop to given action value', () => {
      const fastDropOnAction = { type: SET_FAST_DROP, fastDrop: true };
      const fastDropOffAction = { type: SET_FAST_DROP, fastDrop: false };
      const expectedState = {
         ...initialState,
         fastDrop: true,
      };
      expect(reducer(initialState, fastDropOnAction)).toEqual(expectedState);
      expect(reducer(expectedState, fastDropOffAction)).toEqual(initialState);
   });
});
