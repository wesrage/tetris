import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Tetromino, { getDimensions } from './Tetromino';
import { BLOCK_SIZE, BORDER_SIZE } from '../constants';

const Root = styled.div`
   border-color: #aaa;
   border-style: solid;
   border-width: ${BORDER_SIZE}vh ${BORDER_SIZE}vh ${BORDER_SIZE}vh 0;
   position: relative;
`;

const Piece = styled.div`
   height: ${BLOCK_SIZE * 3}vh;
   margin: ${BLOCK_SIZE / 2}vh;
   position: relative;
   width: ${BLOCK_SIZE * 4}vh;
`;

const QueueDisplay = ({ queue }) => (
   <Root>
      {queue.map((piece, index) => {
         const dimensions = getDimensions({ type: piece, rotation: 0 });
         const position = [
            (dimensions.width === 3) ? 0.5 : 0,
            (dimensions.height > 1) ? 0.5 : 0,
         ];
         return (
            <Piece key={`${piece}-${index}`}>
               <Tetromino type={piece} position={position}/>
            </Piece>
         );
      })}
   </Root>
);

QueueDisplay.propTypes = {
   queue: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QueueDisplay;
