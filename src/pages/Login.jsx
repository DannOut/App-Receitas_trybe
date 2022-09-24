// import React, { useState } from 'react';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import { MIN_PASSWORD } from '../helpers/constants';
import { saveLocalStorage } from '../helpers/localStorage';
import InputLogin from '../components/login-components/Input-Login.component';
import ButtonLogin from '../components/login-components/Button-Login.component';

function Login() {
  const { loginInfo: { email, password }, setLoginInfo } = useContext(LoginContext);
  const history = useHistory();

  const formValidation = () => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return regex.test(email) && password.length > MIN_PASSWORD;
  };

  const onHandleChange = ({ target: { name, value } }) => {
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const redirectBtn = () => {
    saveLocalStorage('user', { email });
    saveLocalStorage('mealsToken', 1);
    saveLocalStorage('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <main>
      <InputLogin
        id="emailInput"
        name="email"
        type="text"
        dataTestId="email-input"
        placeholder="Email"
        value={ email }
        onHandleChange={ onHandleChange }
      />
      <InputLogin
        id="passwordInput"
        name="password"
        type="password"
        dataTestId="password-input"
        placeholder="Password"
        value={ password }
        onHandleChange={ onHandleChange }
      />
      <ButtonLogin
        id="buttonLogin"
        name="Enter"
        dataTestId="login-submit-btn"
        isDisabled={ !formValidation() }
        onClick={ redirectBtn }
      />

    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
