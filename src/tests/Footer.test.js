import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
// import Meals from '../pages/Meals';
import renderWithRouter from '../helpers/renderWithRouter';
import { TEST_ID_FOOTER_MEALS, TEST_ID_FOOTER_DRINKS } from '../helpers/constants';
import beefMeals from '../../cypress/mocks/beefMeals';
// import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
// import { MEALS_URL_BASE, DRINKS_URL_BASE } from '../helpers/constants';

describe('Testing Footer Page with components', () => {
  test('Footer is rendered', async () => {
    const { history } = renderWithRouter(<App />, '/meals');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');

    const mealsFooter = await screen.findByTestId(TEST_ID_FOOTER_MEALS);
    const drinkFooter = await screen.findByTestId(TEST_ID_FOOTER_DRINKS);

    expect(mealsFooter).toBeInTheDocument();
    expect(drinkFooter).toBeInTheDocument();
  });
});
