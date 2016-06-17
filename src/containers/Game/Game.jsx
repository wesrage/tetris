import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import Matrix from '../../components/Matrix';
import * as events from '../../store/reducers/events';

class Game extends Component {
   static propTypes = {
      grid: PropTypes.arrayOf(PropTypes.arrayOf(
         PropTypes.string,
      )),
   }

   static defaultProps = {
      grid: [],
   }

   componentDidMount() {
      debugger;
      this.props.events.initialize();
      setInterval(this.props.events.drop, 1000);
   }

   render() {
      return (
         <div>
            <Helmet title="Tetris"/>
            <Matrix grid={this.props.grid}/>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   grid: state.grid,
});

const mapDispatchToProps = dispatch => ({
   events: bindActionCreators(events, dispatch),
})

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Game);
