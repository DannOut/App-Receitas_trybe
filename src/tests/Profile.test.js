import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Profile test page', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage.clear();
    global.localStorage = localStorageMock;
  });
  test('Components Profile deletes localStorage', async () => {
    global.localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        178319: ['Hpnotiq', 'Pineapple Juice', 'Banana Liqueur'],
      },
    }));
    global.localStorage.setItem('user', JSON.stringify({
      email: 'teste@teste.com',
    }));

    const { history } = renderWithRouter(<App />, '/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
