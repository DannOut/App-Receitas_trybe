import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MIN_PASSWORD } from '../helpers/constants';
import { saveLocalStorage } from '../helpers/localStorage';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formValidation = () => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return regex.test(email) && password.length > MIN_PASSWORD;
  };

  const redirectBtn = () => {
    saveLocalStorage('user', { email });
    saveLocalStorage('mealsToken', 1);
    saveLocalStorage('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <main>
      <label htmlFor="emailInput">
        <input
          name="email"
          type="text"
          id="emailInput"
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </label>
      <label htmlFor="passwordInput">
        <input
          name="password"
          type="password"
          placeholder="Password"
          id="passwordInput"
          value={ password }
          data-testid="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !formValidation() }
        onClick={ redirectBtn }
      >
        Enter
      </button>

    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
