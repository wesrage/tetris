import React, { PropTypes } from 'react';
import styled from 'styled-components';
import DisplayValue from './DisplayValue';
import { BORDER_SIZE } from '../constants';

const Root = styled.div`
   border-color: #aaa;
   border-style: solid;
   border-width: 0 ${BORDER_SIZE}px ${BORDER_SIZE}px 0;
   display: flex;
   flex-direction: column;
   font-size: 1em;
   height: 225px;
   text-align: center;
   text-transform: uppercase;
`;

const ScoreDisplay = ({ lines, level, score }) => (
   <Root>
      <DisplayValue title="Level">{level}</DisplayValue>
      <DisplayValue title="Lines">{lines}</DisplayValue>
      <DisplayValue title="Score">{Number(score).toLocaleString()}</DisplayValue>
   </Root>
);

ScoreDisplay.propTypes = {
   level: PropTypes.number.isRequired,
   lines: PropTypes.number.isRequired,
   score: PropTypes.number.isRequired,
};

export default ScoreDisplay;
