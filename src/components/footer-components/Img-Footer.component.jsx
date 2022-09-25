import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function ImgFooter({ srcImg, linkTo, altImg, dataTestId }) {
  return (
    <NavLink to={ linkTo }>
      <img
        src={ srcImg }
        alt={ altImg }
        data-testid={ dataTestId }
      />
    </NavLink>
  );
}

ImgFooter.propTypes = {
  srcImg: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  altImg: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default ImgFooter;
