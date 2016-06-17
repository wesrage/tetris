// Events
const INITIALIZE = 'tetris/events/INITIALIZE';
const DROP = 'tetris/events/DROP';
const DEPLOY = 'tetris/events/DEPLOY';

// Controls
const FLIP = 'tetris/controls/FLIP';
const MOVE = 'tetris/controls/MOVE';
const HOLD = 'tetris/controls/HOLD';
const SEND_TO_BOTTOM = 'tetris/controls/SEND_TO_BOTTOM';
const TOGGLE_DROP_SPEED = 'tetris/controls/TOGGLE_DROP_SPEED';

const height = 20;
const width = 10;

const emptyGrid = (h, w) =>
   [...Array(h).keys()].map(() => (
      [...Array(w).keys()].map(() => null)));

const initialState = {
   active: null,
   fastDrop: false,
   grid: emptyGrid(height, width),
   hold: null,
   queue: [],
};

export default function reducer(state = initialState, action = {}) {
   console.log('action:', action);
   return ({
      // [DROP]: () => ({}),
      [DEPLOY]: () => ({
         ...state,
         active: state.queue[0],
         queue: [
            ...state.queue.slice(1),
            action.tetromino,
         ],
      }),
      [INITIALIZE]: () => ({
         ...state,
         active: action.queue[0],
         queue: action.queue.slice(1),
      }),
      // [FLIP]: () => ({}),
      // [MOVE]: () => ({}),
      [HOLD]: () => ({
         ...state,
         hold: state.active,
         active: state.hold || state.queue[0],
      }),
      // [SEND_TO_BOTTOM]: () => ({}),
      [TOGGLE_DROP_SPEED]: () => ({
         ...state,
         fastDrop: action.fastDrop,
      }),
   }[action.type] || (() => state))();
}

export const drop = () => ({
   type: DROP,
});

export const deploy = tetromino => ({
   type: DEPLOY,
   tetromino,
});

export const initialize = queue => ({
   type: INITIALIZE,
   queue,
});

export const flip = direction => ({
   type: FLIP,
   direction,
});

export const move = direction => ({
   type: MOVE,
   direction,
});

export const hold = () => (dispatch, getState) => {
   const hasHoldPiece = !!getState().hold;
   if (!hasHoldPiece) {
      // TODO: Which tetromino should be enqueued?
      deploy(null);
   }
   return {
      type: HOLD,
   };
};

export const sendToBottom = () => ({
   type: SEND_TO_BOTTOM,
});

export const toggleDropSpeed = fastDrop => ({
   type: TOGGLE_DROP_SPEED,
   fastDrop,
});
