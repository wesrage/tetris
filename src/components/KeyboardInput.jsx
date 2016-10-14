import { Component, PropTypes } from 'react';

export default class KeyboardInput extends Component {
   static propTypes = {
      mappings: PropTypes.object,
   }

   static defaultProps = {
      mappings: {
         keyDown: {},
         keyUp: {},
      },
   }

   state = {
      pressed: {},
   };

   componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('keyup', this.handleKeyUp);
   }

   componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('keyup', this.handleKey);
   }

   handleKeyDown = e => {
      const mappings = this.props.mappings.keyDown || {};
      if (e.key in mappings) {
         e.preventDefault();
         if (!this.state.pressed[e.key]) {
            this.setState({
               pressed: { [e.key]: true },
            });
            mappings[e.key]();
         }
      }
   }

   handleKeyUp = e => {
      const mappings = this.props.mappings.keyUp || {};
      this.setState({
         pressed: { [e.key]: undefined },
      });
      if (e.key in mappings) {
         e.preventDefault();
         mappings[e.key]();
      }
   }

   render() {
      return null;
   }
}
