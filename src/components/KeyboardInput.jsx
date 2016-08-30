import { Component, PropTypes } from 'react';

export default class KeyboardInput extends Component {
   static propTypes = {
      mappings: PropTypes.object,
   }

   static defaultProps = {
      mappings: {},
   }

   componentDidMount() {
      document.addEventListener('keyup', this.handleKeyUp);
   }

   componentWillUnmount() {
      document.removeEventListener('keyup', this.handleKeyUp);
   }

   handleKeyUp = e => {
      if (e.key in this.props.mappings) {
         e.preventDefault();
         this.props.mappings[e.key]();
      }
   }

   render() {
      return null;
   }
}
