import { generateBag } from '../util/RandomGenerator';
import { getGridPositions } from '../components/Tetromino';

import {
   INITIALIZE,
   DROP,
   DEPLOY,
   LOCK,
   MOVE,
   HOLD,
   ROTATE,
   SEND_TO_BOTTOM,
   SET_FAST_DROP,
   HEIGHT,
   WIDTH,
   QUEUE_SIZE,
} from './constants';

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
