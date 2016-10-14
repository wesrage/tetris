import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import styled from 'styled-components';
import Centered from './Centered';
import GamePanelScreen from './GamePanelScreen';

const GameOverScreenRoot = styled(GamePanelScreen)`
   background-color: rgba(0, 0, 0, 0.8);
   z-index: 100;
`;

const RestartRoot = styled.div`
   font-size: 0.6em;
   margin-top: 2.5em;
   position: absolute;
   text-align: center;
   width: 100%;
`;

const RestartLink = styled.span`
   cursor: pointer;
   padding: 0.5em;
   user-select: none;
   &:hover {
      background-color: rgba(0, 128, 0, 0.8);
      border-radius: 5px;
   }
`;

const RestartLinkText = styled.span`
   margin-left: 1em;
`;

const Restart = ({ onRestart }) => (
   <RestartRoot>
      <RestartLink onClick={onRestart}>
         <Icon name="play"/>
         <RestartLinkText>Play Again</RestartLinkText>
      </RestartLink>
   </RestartRoot>
);
Restart.propTypes = {
   onRestart: PropTypes.func.isRequired,
};

const GameOverScreen = ({ onRestart }) => (
   <GameOverScreenRoot>
      <Centered>
         <div>GAME OVER</div>
         <Restart onRestart={onRestart}/>
      </Centered>
   </GameOverScreenRoot>
);
GameOverScreen.propTypes = {
   onRestart: PropTypes.func.isRequired,
};

export default GameOverScreen;
