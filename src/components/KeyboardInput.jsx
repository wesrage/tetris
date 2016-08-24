import { Component, PropTypes } from 'react';

export default class KeyboardInput extends Component {
   static propTypes = {
      mappings: PropTypes.object,
   }

   static defaultProps = {
      mappings: {},
   }

   componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
   }

   componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
   }

   handleKeyDown = e => {
      if (e.key in this.props.mappings) {
         e.preventDefault();
         this.props.mappings[e.key]();
      }
   }

   render() {
      return null;
   }
}
