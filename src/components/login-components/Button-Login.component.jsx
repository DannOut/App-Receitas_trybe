import React from 'react';
import PropTypes from 'prop-types';

function ButtonLogin({
  id,
  name,
  dataTestId,
  isDisabled,
  onClick,
}) {
  return (
    <div>
      <button
        id={ id }
        name={ name }
        type="button"
        data-testid={ dataTestId }
        disabled={ isDisabled }
        onClick={ onClick }
      >
        { name }
      </button>
    </div>
  );
}

ButtonLogin.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonLogin;
