import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { BLOCK_SIZE, GHOST_OPACITY } from '../constants';

const colors = {
   I: '#00ffff',
   J: '#0000ff',
   L: '#ffa500',
   O: '#ffff00',
   S: '#008000',
   T: '#800080',
   Z: '#ff0000',
};

const hexToRgba = (hex, alpha) => {
   const bigint = parseInt(hex.slice(1), 16);
   const r = (bigint >> 16) & 255;
   const g = (bigint >> 8) & 255;
   const b = bigint & 255;
   const values = [r, g, b, alpha];
   return `rgba(${values.join(',')})`;
};

const getBackgroundColor = props => {
   const color = colors[props.type];
   return (props.outlined) ? hexToRgba(color, GHOST_OPACITY)
      : (props.filled) ? color
      : null;
};

const getBorderColor = props => (
   (props.outlined)
      ? colors[props.type]
      : null
);

const UnitBlockStyled = styled.div`
   background-color: ${props => getBackgroundColor(props)};
   border-color: ${props => getBorderColor(props)};
   border-style: ${props => (props.outlined ? 'solid' : 'none')};
   border-width: ${props => (props.outlined ? 1 : 0)}px;
   display: inline-block;
   height: ${BLOCK_SIZE}vh;
   left: ${props => (props.x ? props.x * BLOCK_SIZE : 0)}vh;
   opacity: ${props => (props.outlined ? 0.8 : 1)};
   position: ${props => (props.absolute ? 'absolute' : 'static')};
   top: ${props => (props.y ? props.y * BLOCK_SIZE : 0)}vh;
   width: ${BLOCK_SIZE}vh;
`;

const UnitBlock = ({ absolute = false, filled = true, outlined = false, type, x, y }) => (
   <UnitBlockStyled
      absolute={absolute}
      filled={filled}
      outlined={outlined}
      type={type}
      x={x}
      y={y}
   />
);

UnitBlock.propTypes = {
   absolute: PropTypes.bool,
   filled: PropTypes.bool,
   outlined: PropTypes.bool,
   style: PropTypes.object,
   type: PropTypes.string,
   x: PropTypes.number,
   y: PropTypes.number,
};

export default UnitBlock;
