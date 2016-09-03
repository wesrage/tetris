import { generateBag } from '../../util/RandomGenerator';
import { getGridPositions } from '../../components/Tetromino';

// Events
const INITIALIZE = 'tetris/events/INITIALIZE';
const DROP = 'tetris/events/DROP';
const DEPLOY = 'tetris/events/DEPLOY';
const LOCK = 'tetris/events/LOCK';

// Controls
const MOVE = 'tetris/controls/MOVE';
const HOLD = 'tetris/controls/HOLD';
const ROTATE = 'tetris/controls/ROTATE';
const SEND_TO_BOTTOM = 'tetris/controls/SEND_TO_BOTTOM';
const SET_FAST_DROP = 'tetris/controls/SET_FAST_DROP';

const HEIGHT = 22;
const WIDTH = 10;
const QUEUE_SIZE = 4;

const emptyGrid = (h, w) =>
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
         hold: state.active,
         active: state.hold || state.queue[0],
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
         const delta = (action.direction) ? 1 : -1;
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

export const deploy = () => (dispatch, getState) => {
   const bag = (getState().queue.length < QUEUE_SIZE)
      ? generateBag()
      : [];
   dispatch({ type: DEPLOY, bag });
};

export const drop = () => (dispatch, getState) => {
   const { active, grid } = getState();
   if (isLegalDrop(active, grid)) {
      dispatch({ type: DROP });
   } else {
      dispatch({ type: LOCK });
      dispatch(deploy());
   }
};

export const initialize = () => ({
   type: INITIALIZE,
   bag: generateBag(),
});

export const rotate = counterClockwise => ({
   type: ROTATE,
   counterClockwise: !!counterClockwise,
});

export const move = direction => (dispatch, getState) => {
   const { active, grid } = getState();
   if (isLegalMove(active, grid, direction)) {
      dispatch({
         type: MOVE,
         direction,
      });
   }
};

export const hold = () => (dispatch, getState) => {
   const hasHoldPiece = !!getState().hold;
   if (!hasHoldPiece) {
      dispatch(deploy());
   }
   dispatch({ type: HOLD });
};

export const sendToBottom = () => ({
   type: SEND_TO_BOTTOM,
});

export const setFastDrop = fastDrop => ({
   type: SET_FAST_DROP,
   fastDrop,
});

function merge({ grid, piece, type }) {
   const result = JSON.parse(JSON.stringify(grid));
   getGridPositions(piece).forEach(([x, y]) => {
      result[y][x] = type;
   });
   return result;
}

function isLegalMove(tetromino, grid, direction) {
   const delta = (direction) ? 1 : -1;
   const gridPositions = getGridPositions(tetromino);
   const nextGridPositions = gridPositions.map(([x, y]) => [x + delta, y]);
   return nextGridPositions.every(([x, y]) =>
      (x >= 0 && x < WIDTH && grid[y][x] === null));
}

function isLegalDrop(tetromino, grid) {
   const gridPositions = getGridPositions(tetromino);
   const nextGridPositions = gridPositions.map(([x, y]) => [x, y + 1]);
   return nextGridPositions.every(([x, y]) =>
      (y < HEIGHT && grid[y][x] === null));
}
