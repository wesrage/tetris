import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
   clear,
   createTetrominoForDeployment,
   deploy,
   drop,
   emptyGrid,
   initialize,
   move,
   rotate,
   hardDrop,
   setFastDrop,
} from '../reducer';
import {
   DEPLOY,
   DROP,
   GAME_OVER,
   LOCK,
   MOVE,
   ROTATE,
   HARD_DROP,
} from '../reducer';
import {
   HEIGHT,
   QUEUE_SIZE,
   WIDTH,
} from '../../constants';

const mockStore = configureMockStore([thunk]);

describe('action creators: clear', () => {
   it('determines which lines are complete', () => {
      const store = mockStore({
         grid: [
            [null, null, null],
            ['S', 'S', 'O'],
            [null, 'I', null],
            ['T', 'I', 'O'],
            ['Z', 'S', 'J'],
            [null, 'T', 'T'],
         ],
      });
      clear()(store.dispatch, store.getState);
      expect(store.getActions()[0].lines).toEqual([1, 3, 4]);
   });
});

describe('action creators: deploy', () => {
   it('generates a new bag when queue is running low', () => {
      const store = mockStore({
         active: createTetrominoForDeployment('I'),
         queue: ['I', 'O', 'J', 'L'],
         grid: emptyGrid(HEIGHT, WIDTH),
      });
      deploy()(store.dispatch, store.getState);
      expect(store.getActions()[0].bag.length).toEqual(7);
   });

   it('does not generate a new bag when queue is running low', () => {
      const store = mockStore({
         active: createTetrominoForDeployment('I'),
         queue: ['I', 'O', 'J', 'L', 'T'],
         grid: emptyGrid(HEIGHT, WIDTH),
      });
      deploy()(store.dispatch, store.getState);
      expect(store.getActions()[0].bag.length).toEqual(0);
   });

   it('triggers a game over if deployment causes overlap', () => {
      const store = mockStore({
         active: createTetrominoForDeployment('I'),
         queue: ['I', 'J', 'T', 'L', 'O'],
         grid: [
            [null, null, null, null, null, null],
            [null, null, 'xx', null, null, null],
         ],
      });
      deploy()(store.dispatch, store.getState);
      expect(store.getActions()).toEqual([
         { type: DEPLOY, bag: [] },
         { type: GAME_OVER },
      ]);
   });
});

describe('action creators: drop', () => {
   it('allows drop into unoccupied space', () => {
      const store = mockStore({
         active: {
            type: 'I',
            position: [3, HEIGHT - 5],
            rotation: 1,
         },
         grid: emptyGrid(HEIGHT, WIDTH),
         queue: Array(QUEUE_SIZE + 1),
      });
      drop()(store.dispatch, store.getState);
      expect(store.getActions()).toEqual([
         { type: DROP },
      ]);
   });

   it('disallows drop past matrix floor', () => {
      const store = mockStore({
         active: {
            type: 'I',
            position: [3, HEIGHT - 4],
            rotation: 1,
         },
         grid: emptyGrid(HEIGHT, WIDTH),
         queue: Array(QUEUE_SIZE + 1),
      });
      drop()(store.dispatch, store.getState);
      expect(store.getActions()).toEqual([
         { type: LOCK },
         { type: DEPLOY, bag: [] },
      ]);
   });

   it('disallows drop through an occupied space', () => {
      const store = mockStore({
         active: {
            type: 'I',
            position: [0, 1],
            rotation: 0,
         },
         grid: [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, 'xx', null, null],
            [null, null, null, null],
         ],
         queue: Array(QUEUE_SIZE + 1),
      });
      drop()(store.dispatch, store.getState);
      expect(store.getActions()).toEqual([
         { type: LOCK },
         { type: DEPLOY, bag: [] },
      ]);
   });
});

describe('action creators: initialize', () => {
   it('should generate a full bag', () => {
      expect(initialize().bag.length).toEqual(7);
   });
});

describe('action creators: move', () => {
   it('should allow movement into unoccupied space', () => {
      const store = mockStore({
         active: {
            type: 'I',
            position: [0, 0],
            rotation: 3,
         },
         grid: [
            [null, null, null, null],
            [null, null, null, 'xx'],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
         ],
      });
      move(true)(store.dispatch, store.getState);
      move(false)(store.dispatch, store.getState);
      expect(store.getActions()).toEqual([
         { type: MOVE, right: true },
         { type: MOVE, right: false },
      ]);
   });

   it('should disallow movement into occupied space', () => {
      const store = mockStore({
         active: {
            type: 'I',
            position: [0, 0],
            rotation: 1,
         },
         grid: [
            [null, null, null, null],
            [null, null, null, 'xx'],
            [null, 'xx', null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
         ],
      });
      move(true)(store.dispatch, store.getState);
      move(false)(store.dispatch, store.getState);
      expect(store.getActions()).toEqual([]);
   });

   it('should disallow movement beyond grid edges', () => {
      const store1 = mockStore({
         active: {
            type: 'I',
            position: [0, 1],
            rotation: 0,
         },
         grid: emptyGrid(HEIGHT, WIDTH),
      });
      const store2 = mockStore({
         active: {
            type: 'J',
            position: [8, 3],
            rotation: 0,
         },
         grid: emptyGrid(HEIGHT, WIDTH),
      });
      move(false)(store1.dispatch, store1.getState);
      move(true)(store2.dispatch, store2.getState);
      expect(store1.getActions()).toEqual([]);
      expect(store2.getActions()).toEqual([]);
   });
});

describe('action creators: rotate', () => {
   it('should produce rotate action with desired direction', () => {
      const store = mockStore({
         active: {
            type: 'J',
            position: [6, 2],
            rotation: 2,
         },
         grid: emptyGrid(HEIGHT, WIDTH),
      });
      rotate(false)(store.dispatch, store.getState);
      rotate(true)(store.dispatch, store.getState);
      expect(store.getActions()).toEqual([
         { type: ROTATE, counterClockwise: false },
         { type: ROTATE, counterClockwise: true },
      ]);
   });

   it('should disallow rotation beyond grid edges', () => {
      const store1 = mockStore({
         active: {
            type: 'I',
            position: [-1, 2],
            rotation: 3,
         },
         grid: emptyGrid(HEIGHT, WIDTH),
      });
      const store2 = mockStore({
         active: {
            type: 'I',
            position: [8, 3],
            rotation: 1,
         },
         grid: emptyGrid(HEIGHT, WIDTH),
      });
      rotate(false)(store1.dispatch, store1.getState);
      rotate(true)(store2.dispatch, store2.getState);
      expect(store1.getActions()).toEqual([]);
      expect(store2.getActions()).toEqual([]);
   });

   it('should disallow rotation into occupied space', () => {
      const store = mockStore({
         active: {
            type: 'I',
            position: [1, 0],
            rotation: 3,
         },
         grid: [
            [null, null, null, null],
            [null, null, null, 'xx'],
            [null, 'xx', null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
         ],
      });
      rotate(true)(store.dispatch, store.getState);
      rotate(false)(store.dispatch, store.getState);
      expect(store.getActions()).toEqual([]);
   });
});

describe('action creators: hardDrop', () => {
   it('should produce corresponding action', () => {
      expect(hardDrop()).toEqual({ type: HARD_DROP });
   });
});

describe('action creators: fastDrop', () => {
   it('should produce fastDrop action with desired switch setting', () => {
      expect(setFastDrop(true).fastDrop).toBeTruthy();
      expect(setFastDrop(false).fastDrop).toBeFalsy();
   });
});
