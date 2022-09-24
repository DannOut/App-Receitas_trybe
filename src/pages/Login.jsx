// import React, { useState } from 'react';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import { MIN_PASSWORD } from '../helpers/constants';
import { saveLocalStorage } from '../helpers/localStorage';

function Login() {
  const { loginInfo: { email, password }, setLoginInfo } = useContext(LoginContext);
  const history = useHistory();

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
          onChange={ ({ target: { value } }) => setLoginInfo((prevState) => ({
            ...prevState,
            email: value,
          })) }

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
          onChange={ ({ target: { value } }) => setLoginInfo((prevState) => ({
            ...prevState,
            password: value,
          })) }

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
