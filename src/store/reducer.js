import { getGridPositions } from '../components/Tetromino';
import { generateBag } from '../util/RandomGenerator';
import {
   HEIGHT,
   QUEUE_SIZE,
   WIDTH,
} from '../constants';

export const INITIALIZE = 'tetris/events/INITIALIZE';
export const CLEAR = 'tetris/events/CLEAR';
export const DROP = 'tetris/events/DROP';
export const DEPLOY = 'tetris/events/DEPLOY';
export const GAME_OVER = 'tetris/events/GAME_OVER';
export const LOCK = 'tetris/events/LOCK';
export const MOVE = 'tetris/controls/MOVE';
export const HOLD = 'tetris/controls/HOLD';
export const ROTATE = 'tetris/controls/ROTATE';
export const HARD_DROP = 'tetris/controls/HARD_DROP';
export const SET_FAST_DROP = 'tetris/controls/SET_FAST_DROP';
export const TOGGLE_PAUSE = 'tetris/controls/TOGGLE_PAUSE';

export const emptyGrid = (h, w) =>
   [...Array(h).keys()].map(() => (
      [...Array(w).keys()].map(() => null)));

const scores = [0, 100, 300, 500, 800, 1200];

const initialState = {
   active: null,
   dropPoints: 0,
   fastDrop: false,
   gameOver: false,
   grid: emptyGrid(HEIGHT, WIDTH),
   hold: null,
   lastClearWasTetris: false,
   lines: 0,
   paused: false,
   queue: [],
   score: 0,
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      case CLEAR: {
         const level = getLevelFromLines(state.lines);
         let basePoints = scores[action.lines.length];
         if (state.lastClearWasTetris && action.lines.length === 4) {
            basePoints = scores[5];
         }
         const points = basePoints * (level + 1);
         return {
            ...state,
            grid: [
               ...emptyGrid(action.lines.length, state.grid[0].length),
               ...state.grid.filter(isIncompleteLine),
            ],
            lastClearWasTetris: action.lines.length === 4,
            lines: state.lines + action.lines.length,
            score: state.score + points,
         };
      }
      case DROP: {
         const [x, y] = state.active.position;
         return {
            ...state,
            active: {
               ...state.active,
               position: [x, y + 1],
            },
            dropPoints: state.dropPoints + (state.fastDrop ? 1 : 0),
         };
      }
      case DEPLOY: return {
         ...state,
         active: createTetrominoForDeployment(state.queue[0]),
         queue: [
            ...state.queue.slice(1),
            ...(action.bag || []),
         ],
         dropPoints: 0,
      };
      case GAME_OVER: return {
         ...state,
         gameOver: true,
      };
      case HARD_DROP: {
         const [x, y] = state.active.position;
         const finalY = calculateGhostPosition(state.active, state.grid);
         const deltaY = finalY - y;
         return {
            ...state,
            active: {
               ...state.active,
               position: [x, finalY],
            },
            dropPoints: state.dropPoints + (2 * deltaY),
         };
      }
      case HOLD: return {
         ...state,
         hold: state.active.type,
         active: createTetrominoForDeployment(state.hold || state.queue[0]),
      };
      case INITIALIZE: return {
         ...initialState,
         queue: action.bag,
      };
      case LOCK: return {
         ...state,
         grid: merge({
            grid: state.grid,
            piece: state.active,
            type: state.active.type,
         }),
         score: state.score + state.dropPoints,
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
      case TOGGLE_PAUSE: return {
         ...state,
         paused: (state.gameOver) ? state.paused : !state.paused,
      };
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
      case SET_FAST_DROP: return {
         ...state,
         fastDrop: action.fastDrop,
      };
      default: return state;
   }
}

export const clear = () => (dispatch, getState) => {
   const completeLineNumbers = getState().grid
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => isCompleteLine(row))
      .map(({ index }) => index);
   if (completeLineNumbers.length > 0) {
      dispatch({
         type: CLEAR,
         lines: completeLineNumbers,
      });
   }
};

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
      dispatch(clear());
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

export const hardDrop = () => dispatch => {
   dispatch({ type: HARD_DROP });
   dispatch(drop());
};

export const setFastDrop = fastDrop => ({
   type: SET_FAST_DROP,
   fastDrop,
});

export const togglePause = () => ({
   type: TOGGLE_PAUSE,
});

export function createTetrominoForDeployment(type) {
   return {
      type,
      position: [3, 0],
      rotation: 0,
   };
}

export function getLevelFromLines(lines) {
   return Math.floor(lines / 10);
}

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

function merge({ grid, piece, type }) {
   const result = JSON.parse(JSON.stringify(grid));
   getGridPositions(piece).forEach(([x, y]) => {
      result[y][x] = type;
   });
   return result;
}

function isCompleteLine(row) {
   return row.every(cell => cell !== null);
}

function isIncompleteLine(row) {
   return !isCompleteLine(row);
}

export function calculateDropInterval(state) {
   const level = getLevelFromLines(state.lines);
   if (level < 10) {
      return [
         800, 720, 630, 550, 470, 380, 300, 220, 130, 100,
         80, 80, 80,
         70, 70, 70,
         50, 50, 50,
      ][level];
   }
   if (level > 18 && level < 29) {
      return 30;
   }
   return 20;
}

export function calculateGhostPosition(tetromino, grid) {
   const heightMap = Array(WIDTH).fill(HEIGHT);
   grid.forEach((row, rowIndex) => {
      if (rowIndex > tetromino.position[1]) {
         row.forEach((cell, colIndex) => {
            if (cell && heightMap[colIndex] === HEIGHT) {
               heightMap[colIndex] = rowIndex;
            }
         });
      }
   });
   const verticalDistances = getGridPositions(tetromino).map(([x, y]) => heightMap[x] - y);
   return tetromino.position[1] + Math.max(0, Math.min(...verticalDistances) - 1);
}
