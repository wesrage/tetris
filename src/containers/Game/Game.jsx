import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import {
   DropTimer,
   GhostPiece,
   KeyboardInput,
   Matrix,
   QueueDisplay,
   ScoreDisplay,
   Tetromino,
} from '../../components';
import { getGridPositions } from '../../components/Tetromino';
import { calculateDropInterval } from '../../store/reducer';
import * as events from '../../store/reducer';
import { TetrominoType } from '../../types';
import {
   FAST_DROP_INTERVAL,
   HEIGHT,
   WIDTH,
} from '../../constants';

class Game extends Component {
   static propTypes = {
      dropInterval: PropTypes.number.isRequired,
      fastDrop: PropTypes.bool.isRequired,
      gameOver: PropTypes.bool.isRequired,
      ghostPosition: PropTypes.number,
      grid: PropTypes.arrayOf(PropTypes.arrayOf(
         PropTypes.string,
      )).isRequired,
      level: PropTypes.number.isRequired,
      lines: PropTypes.number.isRequired,
      piece: PropTypes.shape(TetrominoType),
      paused: PropTypes.bool.isRequired,
      queue: PropTypes.arrayOf(PropTypes.string).isRequired,
      events: PropTypes.shape({
         deploy: PropTypes.func.isRequired,
         drop: PropTypes.func.isRequired,
         initialize: PropTypes.func.isRequired,
         move: PropTypes.func.isRequired,
         rotate: PropTypes.func.isRequired,
         setFastDrop: PropTypes.func.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
   }

   componentDidMount() {
      this.props.events.initialize();
      this.props.events.deploy();
   }

   keyMappings = {
      keyDown: {
         ArrowDown: this.props.events.setFastDrop.bind(this, true),
         ArrowLeft: this.props.events.move.bind(this, false),
         ArrowRight: this.props.events.move.bind(this, true),
         Control: this.props.events.rotate.bind(this, false),
         ' ': this.props.events.rotate.bind(this, true),
      },
      keyUp: {
         ArrowDown: this.props.events.setFastDrop.bind(this, false),
      },
   };

   renderTetromino() {
      return this.props.piece && (
         <Tetromino {...this.props.piece}/>
      );
   }

   renderGhostPiece() {
      return this.props.piece && (
         <GhostPiece
            {...this.props.piece}
            position={[
               this.props.piece.position[0],
               this.props.ghostPosition,
            ]}
         />
      );
   }

   render() {
      return (
         <div className="game-root">
            <Helmet title="Tetris"/>
            <KeyboardInput mappings={this.keyMappings}/>
            <DropTimer
               interval={this.props.fastDrop ? FAST_DROP_INTERVAL : this.props.dropInterval}
               paused={this.props.paused || this.props.gameOver}
               onTick={this.props.events.drop}
            />
            <Matrix grid={this.props.grid}>
               {this.renderTetromino()}
               {this.renderGhostPiece()}
            </Matrix>
            <div className="info-panel">
               <QueueDisplay queue={this.props.queue}/>
               <ScoreDisplay
                  level={this.props.level}
                  lines={this.props.lines}
                  score={this.props.score}
               />
            </div>
         </div>
      );
   }
}

function calculateGhostPosition(tetromino, grid) {
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

const mapStateToProps = state => ({
   dropInterval: calculateDropInterval(state),
   fastDrop: state.fastDrop,
   gameOver: state.gameOver,
   ghostPosition: state.active ? calculateGhostPosition(state.active, state.grid) : null,
   grid: state.grid,
   level: Math.floor(state.lines / 10),
   lines: state.lines,
   paused: state.paused,
   piece: state.active,
   queue: state.queue.slice(0, 4),
   score: state.score,
});

const mapDispatchToProps = dispatch => ({
   events: bindActionCreators(events, dispatch),
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Game);
