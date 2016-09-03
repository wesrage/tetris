import { Component, PropTypes } from 'react';

export default class DropTimer extends Component {
   static propTypes = {
      interval: PropTypes.number.isRequired,
      paused: PropTypes.bool.isRequired,
      onTick: PropTypes.func.isRequired,
   };

   componentDidMount() {
      this.interval = setInterval(this.props.onTick, this.props.interval);
   }

   shouldComponentUpdate(nextProps) {
      return !(
         nextProps.interval === this.props.interval &&
         nextProps.paused === this.props.paused
      );
   }

   componentDidUpdate() {
      // TODO: Should we use the percentage completion of the previous interval
      // instead of starting from scratch?
      clearInterval(this.interval);
      this.interval = setInterval(this.props.onTick, this.props.interval);
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   render() {
      return null;
   }
}
