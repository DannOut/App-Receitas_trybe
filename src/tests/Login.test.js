import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { EMAIL_TEST, PASSWORD_TEST, TEST_ID_EMAIL_INPUT, TEST_ID_LOGIN_SUBMIT, TEST_ID_PASSWORD_INPUT } from '../helpers/constants';
import renderWithRouter from '../helpers/renderWithRouter';

describe(' Testing Login Page with components', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage.clear();
    global.localStorage = localStorageMock;
  });
  test('Page is Rendered', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = screen.getByTestId(TEST_ID_PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(TEST_ID_LOGIN_SUBMIT);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });

  test('if inputs are validated', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = screen.getByTestId(TEST_ID_PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(TEST_ID_LOGIN_SUBMIT);

    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(passwordInput, PASSWORD_TEST);

    expect(loginBtn).toBeEnabled();
  });

  test('if localStorage is working as expected', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = screen.getByTestId(TEST_ID_PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(TEST_ID_LOGIN_SUBMIT);

    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(passwordInput, PASSWORD_TEST);

    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    const GetEmailFromLocalStorage = JSON.parse(global.localStorage.getItem('user'));
    expect(GetEmailFromLocalStorage.email).toBe(EMAIL_TEST);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
