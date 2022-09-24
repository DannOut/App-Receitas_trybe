import React from 'react';
import PropTypes from 'prop-types';

function InputLogin({
  name,
  type,
  id,
  dataTestId,
  placeholder,
  value,
  onHandleChange,
}) {
  return (
    <div>
      <label htmlFor={ id }>
        <input
          id={ id }
          name={ name }
          type={ type }
          data-testid={ dataTestId }
          placeholder={ placeholder }
          value={ value }
          onChange={ onHandleChange }
        />
      </label>
    </div>
  );
}

InputLogin.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};

export default InputLogin;
