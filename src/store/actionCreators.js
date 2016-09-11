import { generateBag } from '../util/RandomGenerator';
import { getGridPositions } from '../components/Tetromino';
import {
   INITIALIZE,
   DROP,
   DEPLOY,
   GAME_OVER,
   LOCK,
   MOVE,
   HOLD,
   ROTATE,
   SEND_TO_BOTTOM,
   SET_FAST_DROP,
} from './types';
import {
   HEIGHT,
   WIDTH,
   QUEUE_SIZE,
} from '../constants';

export const deploy = () => (dispatch, getState) => {
   const bag = (getState().queue.length <= QUEUE_SIZE)
      ? generateBag()
      : [];
   dispatch({ type: DEPLOY, bag });
   const { active, grid } = getState();
   if (!isNoOverlap(grid, getGridPositions(active))) {
      dispatch({ type: GAME_OVER });
   }
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

export const rotate = counterClockwise => (dispatch, getState) => {
   const { active, grid } = getState();
   if (isLegalRotation(active, grid, counterClockwise)) {
      dispatch({
         type: ROTATE,
         counterClockwise,
      });
   }
};

export const move = right => (dispatch, getState) => {
   const { active, grid } = getState();
   if (isLegalMove(active, grid, right)) {
      dispatch({
         type: MOVE,
         right,
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

function isLegalMove(tetromino, grid, right) {
   const delta = (right) ? 1 : -1;
   const gridPositions = getGridPositions(tetromino);
   const nextGridPositions = gridPositions.map(([x, y]) => [x + delta, y]);
   return isNoOverlap(grid, nextGridPositions);
}

function isLegalDrop(tetromino, grid) {
   const gridPositions = getGridPositions(tetromino);
   const nextGridPositions = gridPositions.map(([x, y]) => [x, y + 1]);
   return isNoOverlap(grid, nextGridPositions);
}

function isLegalRotation(tetromino, grid, counterClockwise) {
   const rotationDelta = (counterClockwise) ? 1 : 3;
   const nextRotation = (tetromino.rotation + rotationDelta) % 4;
   const nextGridPositions = getGridPositions({
      ...tetromino,
      rotation: nextRotation,
   });
   return isNoOverlap(grid, nextGridPositions);
}

function isNoOverlap(grid, positions) {
   return positions.every(([x, y]) =>
      x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT && grid[y][x] === null);
}
