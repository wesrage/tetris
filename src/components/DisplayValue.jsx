import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { BLOCK_SIZE } from '../constants';

const Root = styled.div`
   flex: auto;
   line-height: ${BLOCK_SIZE * 2 / 3}vh;
   padding: ${BLOCK_SIZE / 2}vh;
`;

const DisplayValue = ({ children, title }) => (
   <Root>
      <div>{title}</div>
      <div>{children}</div>
   </Root>
);

DisplayValue.propTypes = {
   children: PropTypes.node,
   title: PropTypes.string,
};

export default DisplayValue;
