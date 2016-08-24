import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { KeyboardInput, Matrix, Tetromino } from '../../components';
import * as events from '../../store/reducers/events';
import { TetrominoType } from '../../types';

class Game extends Component {
   static propTypes = {
      grid: PropTypes.arrayOf(PropTypes.arrayOf(
         PropTypes.string,
      )).isRequired,
      piece: TetrominoType,
      events: PropTypes.shape({
         deploy: PropTypes.func.isRequired,
         drop: PropTypes.func.isRequired,
         move: PropTypes.func.isRequired,
      }).isRequired,
   }

   static defaultProps = {
      grid: [],
   }


   componentDidMount() {
      this.props.events.deploy();
      setInterval(this.props.events.drop, 1000);
   }

   keyMappings = {
      ArrowLeft: this.props.events.move.bind(this, false),
      ArrowRight: this.props.events.move.bind(this, true),
   };

   render() {
      return (
         <div>
            <Helmet title="Tetris"/>
            <KeyboardInput mappings={this.keyMappings}/>
            <Matrix grid={this.props.grid}>
                {this.props.piece &&
                   <Tetromino type="I" position={this.props.piece.position}/>
                }
            </Matrix>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   grid: state.grid,
   piece: state.active,
});

const mapDispatchToProps = dispatch => ({
   events: bindActionCreators(events, dispatch),
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Game);
