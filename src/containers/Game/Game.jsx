import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Game extends Component {
   static propTypes = {

   }

   static defaultProps = {

   }

   render() {
      return (
         <div>
            <Helmet title="Tetris"/>
            <h1>Tetris</h1>
         </div>
      );
   }
}
