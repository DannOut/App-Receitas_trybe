// import React, { useState } from 'react';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import {
  MIN_PASSWORD, MEALS_LINK, EMAIL, PASSWORD,
  DATA_ID_EMAIL_INPUT,
  DATA_ID_PASSWORD_INPUT,
  DATA_ID_LOGIN_SUBMIT_BTN } from '../helpers/constants';
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
    history.push(MEALS_LINK);
  };

  return (
    <main>
      <InputLogin
        id="emailInput"
        name={ EMAIL }
        type="text"
        dataTestId={ DATA_ID_EMAIL_INPUT }
        placeholder="Email"
        value={ email }
        onHandleChange={ onHandleChange }
      />
      <InputLogin
        id="passwordInput"
        name={ PASSWORD }
        type={ PASSWORD }
        dataTestId={ DATA_ID_PASSWORD_INPUT }
        placeholder="Password"
        value={ password }
        onHandleChange={ onHandleChange }
      />
      <ButtonLogin
        id="buttonLogin"
        name="Enter"
        dataTestId={ DATA_ID_LOGIN_SUBMIT_BTN }
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
