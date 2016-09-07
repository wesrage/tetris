import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { emptyGrid } from '../reducer';
import {
   deploy,
   drop,
   // hold,
   initialize,
   move,
   rotate,
   sendToBottom,
   setFastDrop,
} from '../actionCreators';
import {
   DEPLOY,
   DROP,
   LOCK,
   SEND_TO_BOTTOM,
} from '../types';
import {
   HEIGHT,
   QUEUE_SIZE,
   WIDTH,
} from '../../constants';

const mockStore = configureMockStore([thunk]);

describe('action creators: deploy', () => {
   it('generates a new bag when queue is running low', () => {
      const store = mockStore({ queue: Array(QUEUE_SIZE) });
      deploy()(store.dispatch, store.getState);
      expect(store.getActions()[0].bag.length).toEqual(7);
   });

   it('does not generate a new bag when queue is running low', () => {
      const store = mockStore({ queue: Array(QUEUE_SIZE + 1) });
      deploy()(store.dispatch, store.getState);
      expect(store.getActions()[0].bag.length).toEqual(0);
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

// describe('action creators: hold', () => {
//    it('', () => {
//
//    });
// });

describe('action creators: initialize', () => {
   it('should generate a full bag', () => {
      expect(initialize().bag.length).toEqual(7);
   });
});

describe('action creators: move', () => {
   it('should allow move to unoccupied space', () => {
      // TODO:
   });

   it('should disallow move beyond grid edges', () => {
      // TODO:
   });

   it('should disallow move to occupied space', () => {
      // TODO:
   });
});

describe('action creators: rotate', () => {
   it('should produce rotate action with desired direction', () => {
      expect(rotate(true).counterClockwise).toBeTruthy();
      expect(rotate(false).counterClockwise).toBeFalsy();
   });
});

describe('action creators: sendToBottom', () => {
   it('should produce corresponding action', () => {
      expect(sendToBottom()).toEqual({ type: SEND_TO_BOTTOM });
   });
});

describe('action creators: fastDrop', () => {
   it('should produce fastDrop action with desired switch setting', () => {
      expect(setFastDrop(true).fastDrop).toBeTruthy();
      expect(setFastDrop(false).fastDrop).toBeFalsy();
   });
});
