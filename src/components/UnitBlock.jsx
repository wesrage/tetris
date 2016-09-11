import React, { PropTypes } from 'react';
import cx from 'classnames';
import { BLOCK_SIZE } from '../constants';

const UnitBlock = ({ absolute = false, filled = true, type, x, y }) => (
   <div style={{
      height: BLOCK_SIZE,
      left: x ? x * BLOCK_SIZE : 0,
      position: absolute ? 'absolute' : 'static',
      top: y ? y * BLOCK_SIZE : 0,
      visibility: filled ? 'visible' : 'hidden',
      width: BLOCK_SIZE,
   }}
      className={cx('unit-block', {
         [`unit-block--${type}`]: type !== undefined,
      })}
   />
);

UnitBlock.propTypes = {
   absolute: PropTypes.bool,
   color: PropTypes.string,
   filled: PropTypes.bool,
   style: PropTypes.object,
   type: PropTypes.string,
   x: PropTypes.number,
   y: PropTypes.number,
};

export default UnitBlock;
