import React, { PropTypes } from 'react';

const DisplayValue = ({ children, title }) => (
   <div className="display-value">
      <div className="display-value__title">{title}</div>
      <div className="display-value__value">{children}</div>
   </div>
);

DisplayValue.propTypes = {
   children: PropTypes.node,
   title: PropTypes.string,
};

export default DisplayValue;
