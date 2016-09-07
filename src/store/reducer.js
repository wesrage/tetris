import { getGridPositions } from '../components/Tetromino';
import {
   INITIALIZE,
   DROP,
   DEPLOY,
   LOCK,
   MOVE,
   HOLD,
   ROTATE,
   SET_FAST_DROP,
} from './types';
import {
   HEIGHT,
   WIDTH,
} from '../constants';

export const emptyGrid = (h, w) =>
   [...Array(h).keys()].map(() => (
      [...Array(w).keys()].map(() => null)));

const initialState = {
   active: null,
   dropInterval: 1000,
   fastDrop: false,
   grid: emptyGrid(HEIGHT, WIDTH),
   hold: null,
   paused: false,
   queue: [],
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      case DROP: {
         const [x, y] = state.active.position;
         return {
            ...state,
            active: {
               ...state.active,
               position: [x, y + 1],
            },
         };
      }
      case DEPLOY: return {
         ...state,
         active: {
            position: [3, 0],
            rotation: 0,
            type: state.queue[0],
         },
         queue: [
            ...state.queue.slice(1),
            ...(action.bag || []),
         ],
      };
      case HOLD: return {
         ...state,
         hold: state.active.type,
         active: {
            type: state.hold || state.queue[0],
            position: [3, 0],
            rotation: 0,
         },
      };
      case INITIALIZE: return {
         ...state,
         queue: action.bag,
      };
      case LOCK: return {
         ...state,
         grid: merge({
            grid: state.grid,
            piece: state.active,
            type: state.active.type,
         }),
      };
      case MOVE: {
         const delta = (action.right) ? 1 : -1;
         const [x, y] = state.active.position;
         return {
            ...state,
            active: {
               ...state.active,
               position: [x + delta, y],
            },
         };
      }
      // case TOGGLE_PAUSE: return {
      //    ...state,
      //    paused: !!state.paused,
      // };
      case ROTATE: return {
         ...state,
         active: {
            ...state.active,
            rotation: ((action.counterClockwise)
               ? state.active.rotation + 1
               : state.active.rotation + 3
            ) % 4,
         },
      };
      // case SEND_TO_BOTTOM: return state;
      case SET_FAST_DROP: return {
         ...state,
         fastDrop: action.fastDrop,
      };
      default: return state;
   }
}

function merge({ grid, piece, type }) {
   const result = JSON.parse(JSON.stringify(grid));
   getGridPositions(piece).forEach(([x, y]) => {
      result[y][x] = type;
   });
   return result;
}
