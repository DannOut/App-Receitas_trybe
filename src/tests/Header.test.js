import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import baseMeals from '../../cypress/mocks/meals';
// import baseDrinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
// import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Testing Header Page with components', () => {
  test('Header is rendered', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(baseMeals)
        .mockResolvedValueOnce(mealCategories),
    });

    renderWithRouter(<App />, '/meals');

    const checkHeader = await screen.findByTestId('search-top-btn');
    expect(checkHeader).toBeInTheDocument();

    userEvent.click(checkHeader);

    const searchInputOff = await screen.findByTestId('search-input');
    expect(searchInputOff).toBeInTheDocument();
  });

  test('profile Icon redirect to profile, async', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(baseMeals)
        .mockResolvedValueOnce(mealCategories),
    });
    const { history } = renderWithRouter(<App />, '/meals');

    const profileBtn = await screen.findByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  test('profile Icon redirect to profile, async', () => {
    renderWithRouter(<App />, '/profile');

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
});
