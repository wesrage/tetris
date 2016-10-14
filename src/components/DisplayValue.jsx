import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
   flex: auto;
   line-height: 1.5em;
   padding: 0.75em 0;
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
