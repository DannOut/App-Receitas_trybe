import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { FAVORITE_LINK } from '../helpers/constants';

test('Components done Recipe redirects do profile', () => {
  const { history } = renderWithRouter(<App />, FAVORITE_LINK);
  const profileBtn = screen.getByTestId('profile-top-btn');
  expect(profileBtn).toBeInTheDocument();
  userEvent.click(profileBtn);

  expect(history.location.pathname).toBe('/profile');
});
