import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import {
   DropTimer,
   KeyboardInput,
   Matrix,
   Tetromino,
} from '../../components';
import * as events from '../../store/reducers/events';
import { TetrominoType } from '../../types';
import { FAST_DROP_INTERVAL } from '../../constants';

class Game extends Component {
   static propTypes = {
      dropInterval: PropTypes.number.isRequired,
      fastDrop: PropTypes.bool.isRequired,
      grid: PropTypes.arrayOf(PropTypes.arrayOf(
         PropTypes.string,
      )).isRequired,
      piece: PropTypes.shape(TetrominoType),
      paused: PropTypes.bool.isRequired,
      events: PropTypes.shape({
         deploy: PropTypes.func.isRequired,
         drop: PropTypes.func.isRequired,
         initialize: PropTypes.func.isRequired,
         move: PropTypes.func.isRequired,
         rotate: PropTypes.func.isRequired,
         setFastDrop: PropTypes.func.isRequired,
      }).isRequired,
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

   render() {
      return (
         <div>
            <Helmet title="Tetris"/>
            <KeyboardInput mappings={this.keyMappings}/>
            <DropTimer
               interval={this.props.fastDrop ? FAST_DROP_INTERVAL : this.props.dropInterval}
               paused={this.props.paused}
               onTick={this.props.events.drop}
            />
            <Matrix grid={this.props.grid}>
                {this.props.piece &&
                   <Tetromino {...this.props.piece}/>
                }
            </Matrix>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   dropInterval: state.dropInterval,
   fastDrop: state.fastDrop,
   grid: state.grid,
   paused: state.paused,
   piece: state.active,
});

const mapDispatchToProps = dispatch => ({
   events: bindActionCreators(events, dispatch),
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Game);
