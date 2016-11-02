import styled from 'styled-components';
import { BLOCK_SIZE } from '../constants';

const BaseTetromino = styled.div`
   position: absolute;
   left: ${props => props.position[0] * BLOCK_SIZE}vh;
   top: ${props => props.position[1] * BLOCK_SIZE}vh;
`;

export default BaseTetromino;
