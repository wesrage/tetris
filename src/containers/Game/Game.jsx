import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {
   DropTimer,
   GameOverScreen,
   GhostPiece,
   KeyboardInput,
   Matrix,
   PauseScreen,
   QueueDisplay,
   ScoreDisplay,
   Tetromino,
} from '../../components';
import { calculateDropInterval, calculateGhostPosition } from '../../store/reducer';
import * as events from '../../store/reducer';
import { TetrominoType } from '../../types';
import {
   BLOCK_SIZE,
   BORDER_SIZE,
   FAST_DROP_INTERVAL,
   HEIGHT,
   WIDTH,
} from '../../constants';

const GameRoot = styled.div`
   color: #fff;
   display: flex;
   font-family: 'PressStart';
   height: ${(HEIGHT * BLOCK_SIZE) + (BORDER_SIZE * 2)}px;
`;

const GamePanel = styled.div`
   background-color: #222;
   border: ${BORDER_SIZE}px solid #aaa;
   font-size: 2em;
   min-width: ${(WIDTH * BLOCK_SIZE) + (BORDER_SIZE * 2)}px;
   position: relative;
   width: ${(WIDTH * BLOCK_SIZE) + (BORDER_SIZE * 2)}px;
`;

const InfoPanel = styled.div`
   background-color: #222;
   width: ${(5 * BLOCK_SIZE) + BORDER_SIZE}px;
`;

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
         hardDrop: PropTypes.func.isRequired,
         togglePause: PropTypes.func.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
   }

   componentDidMount() {
      this.startGame();
   }

   startGame = () => {
      this.props.events.initialize();
      this.props.events.deploy();
   }

   keyMappings = {
      keyDown: {
         ArrowDown: this.props.events.setFastDrop.bind(this, true),
         ArrowLeft: this.props.events.move.bind(this, false),
         ArrowRight: this.props.events.move.bind(this, true),
         ArrowUp: this.props.events.hardDrop,
         Control: this.props.events.rotate.bind(this, false),
         p: this.props.events.togglePause,
         ' ': this.props.events.rotate.bind(this, true),
      },
      keyUp: {
         ArrowDown: this.props.events.setFastDrop.bind(this, false),
      },
   };

   gameOverKeyMappings = {
      keyDown: {
         ' ': this.startGame,
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

   renderGamePanel = () => (
      <GamePanel>
         {this.props.gameOver && <GameOverScreen onRestart={this.startGame}/>}
         {this.props.paused
            ? <PauseScreen/>
            : this.renderMatrix()
         }
      </GamePanel>
   )

   renderMatrix = () => (
      <Matrix grid={this.props.grid}>
         {this.renderTetromino()}
         {this.renderGhostPiece()}
      </Matrix>
   )

   render() {
      const keyMappings = this.props.gameOver ? this.gameOverKeyMappings : this.keyMappings;
      return (
         <GameRoot>
            <Helmet title="Tetris"/>
            <KeyboardInput mappings={keyMappings}/>
            <DropTimer
               interval={this.props.fastDrop ? FAST_DROP_INTERVAL : this.props.dropInterval}
               paused={this.props.paused || this.props.gameOver}
               onTick={this.props.events.drop}
            />
            {this.renderGamePanel()}
            <InfoPanel>
               <QueueDisplay queue={this.props.queue}/>
               <ScoreDisplay
                  level={this.props.level}
                  lines={this.props.lines}
                  score={this.props.score}
               />
            </InfoPanel>
         </GameRoot>
      );
   }
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
