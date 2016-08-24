import { generateBag } from '../../util/RandomGenerator';
import { calculateTetrominoWidth } from '../../components/Tetromino';
import clamp from 'clamp';

// Events
const INITIALIZE = 'tetris/events/INITIALIZE';
const DROP = 'tetris/events/DROP';
const DEPLOY = 'tetris/events/DEPLOY';

// Controls
const MOVE = 'tetris/controls/MOVE';
const HOLD = 'tetris/controls/HOLD';
const ROTATE = 'tetris/controls/ROTATE';
const SEND_TO_BOTTOM = 'tetris/controls/SEND_TO_BOTTOM';
const TOGGLE_DROP_SPEED = 'tetris/controls/TOGGLE_DROP_SPEED';

const HEIGHT = 20;
const WIDTH = 10;
const QUEUE_SIZE = 4;

const emptyGrid = (h, w) =>
   [...Array(h).keys()].map(() => (
      [...Array(w).keys()].map(() => null)));

const initialState = {
   active: null,
   fastDrop: false,
   grid: emptyGrid(HEIGHT, WIDTH),
   hold: null,
   queue: [],
};

export default function reducer(state = initialState, action = {}) {
   console.log('action:', action);
   switch (action.type) {
      case DROP: return {
         ...state,
         active: {
            ...state.active,
            position: [
               state.active.position[0],
               state.active.position[1] + 1,
            ],
         },
      };
      case DEPLOY: return {
         ...state,
         active: {
            type: state.queue[0],
            position: [0, 0],
         },
         queue: [
            ...state.queue.slice(1),
            ...action.bag,
         ],
      };
      case HOLD: return {
         ...state,
         hold: state.active,
         active: state.hold || state.queue[0],
      };
      // case INITIALIZE: return state;
      case MOVE: {
         const delta = (action.direction ? 1 : -1);
         const prevX = state.active.position[0];
         const maxX = WIDTH - calculateTetrominoWidth(state.active);
         const x = clamp(prevX + delta, 0, maxX);
         return {
            ...state,
            active: {
               ...state.active,
               position: [x, state.active.position[1]],
            },
         };
      }
      case ROTATE: return {
         ...state,
         active: {
            ...state.active,
            rotation: ((action.direction)
               ? state.active.rotation + 1
               : state.active.rotation - 1
            ) % 4,
         },
      };
      // case SEND_TO_BOTTOM: return state;
      case TOGGLE_DROP_SPEED: return {
         ...state,
         fastDrop: action.fastDrop,
      };
      default: return state;
   }
}

export const drop = () => ({
   type: DROP,
});

export const deploy = () => (dispatch, getState) => {
   const bag = (getState().queue.length < QUEUE_SIZE)
      ? generateBag()
      : [];
   dispatch({
      type: DEPLOY,
      bag,
   });
};

export const initialize = () => ({
   type: INITIALIZE,
});

export const rotate = counterClockwise => ({
   type: ROTATE,
   counterClockwise: !!counterClockwise,
});

export const move = direction => ({
   type: MOVE,
   direction,
});

export const hold = () => (dispatch, getState) => {
   const hasHoldPiece = !!getState().hold;
   if (!hasHoldPiece) {
      deploy();
   }
   dispatch({
      type: HOLD,
   });
};

export const sendToBottom = () => ({
   type: SEND_TO_BOTTOM,
});

export const toggleDropSpeed = fastDrop => ({
   type: TOGGLE_DROP_SPEED,
   fastDrop,
});
