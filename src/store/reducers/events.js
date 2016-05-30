import itch from 'itch';

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

const initialState = {
   active: null,
   fastDrop: false,
   grid: [],
   hold: null,
   queue: [],
};

export default function reducer(state = initialState, action = {}) {
   return itch(action.type)
   .match(DROP).then({

   })
   .match(DEPLOY).then({
      active: state.queue[0],
      queue: [
         ...state.queue.slice(1),
         action.tetromino,
      ],
   })
   .match(INITIALIZE).then({
      ...state,
      active: action.queue[0],
      queue: action.queue.slice(1),
   })
   .match(FLIP).then({

   })
   .match(MOVE).then({

   })
   .match(HOLD).then({
      ...state,
      hold: state.active,
      active: state.hold || state.queue[0],
   })
   .match(SEND_TO_BOTTOM).then({

   })
   .match(TOGGLE_DROP_SPEED).then({
      ...state,
      fastDrop: action.fastDrop,
   })
   .scratch(state);
}

export const drop = () => dispatch => {
   dispatch({
      type: DROP,
   });
};

export const deploy = tetromino => dispatch => {
   dispatch({
      type: DEPLOY,
      tetromino,
   });
};

export const initialize = queue => dispatch => {
   dispatch({
      type: INITIALIZE,
      queue,
   });
};

export const flip = direction => dispatch => {
   dispatch({
      type: FLIP,
      direction,
   });
};

export const move = direction => dispatch => {
   dispatch({
      type: MOVE,
      direction,
   });
};

export const hold = () => (dispatch, getState) => {
   const hasHoldPiece = !!getState().hold;
   dispatch({
      type: HOLD,
   });
   if (!hasHoldPiece) {
      // TODO: Which tetromino should be enqueued?
      deploy(null);
   }
};

export const sendToBottom = () => dispatch => {
   dispatch({
      type: SEND_TO_BOTTOM,
   });
};

export const toggleDropSpeed = fastDrop => dispatch => {
   dispatch({
      type: TOGGLE_DROP_SPEED,
      fastDrop,
   });
};
