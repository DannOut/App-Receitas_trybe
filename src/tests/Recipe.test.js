import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import baseMeals from '../../cypress/mocks/meals';
import baseDrinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import { CHICKEN_CATEGORY_FILTER } from '../helpers/constants';
// import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testing Filter Page with components', () => {
  test('Components Meals exist in page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(baseMeals),
    });

    const { history } = renderWithRouter(<App />, '/meals');

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');

    const imgMeal = await screen.findByTestId('0-card-img');
    expect(imgMeal).toBeInTheDocument();
    const chickenFilter = await screen.findByTestId(CHICKEN_CATEGORY_FILTER);
    expect(chickenFilter).toBeInTheDocument();
  });

  test('Components Drinks exist in page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinkCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(cocktailDrinks),
    });

    const { history } = renderWithRouter(<App />, '/drinks');

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/drinks');

    const CockTailFilter = await screen.findByTestId('Cocktail-category-filter');
    expect(CockTailFilter).toBeInTheDocument();

    const imgMeal = await screen.findByTestId('0-card-img');
    expect(imgMeal).toBeInTheDocument();
  });
  test('Filtering meals works as intended', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(chickenMeals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(baseMeals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    });

    renderWithRouter(<App />, '/meals');
    const chickenFilter = await screen.findByTestId(CHICKEN_CATEGORY_FILTER);
    expect(chickenFilter).toBeInTheDocument();

    userEvent.click(chickenFilter);

    const chickenCatch = await screen.findAllByRole('img');
    expect(chickenCatch).toHaveLength(15);

    const getBrownStewChicken = await screen.findByAltText(/Brown Stew Chicken/i);
    expect(getBrownStewChicken).toBeInTheDocument();
  });
  test('All Meals filtering works as intended', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(baseMeals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(chickenMeals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    });

    renderWithRouter(<App />, '/meals');
    const getBrownStewChicken = await screen.findByAltText(/Brown Stew Chicken/i);
    expect(getBrownStewChicken).toBeInTheDocument();

    const allFilters = await screen.findByTestId(/All-category-filter/i);
    expect(allFilters).toBeInTheDocument();

    userEvent.click(allFilters);

    const corbaMeal = await screen.findByAltText(/Corba/i);
    expect(corbaMeal).toBeInTheDocument();
  });

  test('Filtering Drinks works as intended', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(cocktailDrinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(baseDrinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinkCategories),
    });

    renderWithRouter(<App />, '/drinks');
    const cocktailFilter = await screen.findByTestId('Cocktail-category-filter');
    expect(cocktailFilter).toBeInTheDocument();

    userEvent.click(cocktailFilter);

    const cocktailCatch = await screen.findAllByRole('img');
    expect(cocktailCatch).toHaveLength(15);

    const getChevyDrink = await screen.findByAltText(/57 Chevy with a White License Plate/i);
    expect(getChevyDrink).toBeInTheDocument();
  });

  test('All Drinks filtering works as intended', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(baseDrinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(cocktailDrinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinkCategories),
    });

    renderWithRouter(<App />, '/drinks');
    const getChevyDrink = await screen.findByAltText(/57 Chevy with a White License Plate/i);
    expect(getChevyDrink).toBeInTheDocument();

    const allFilters = await screen.findByTestId(/All-category-filter/i);
    expect(allFilters).toBeInTheDocument();

    userEvent.click(allFilters);

    const GGDrink = await screen.findByAltText(/GG/i);
    expect(GGDrink).toBeInTheDocument();
  });

  test('when clicking in a Meal Recipe, redirect to new Details URL', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseMeals)
        .mockResolvedValueOnce(mealCategories),
    });

    const { history } = renderWithRouter(<App />, '/meals');
    const getCorba = await screen.findByAltText(/Corba/i);
    expect(getCorba).toBeInTheDocument();
    userEvent.click(getCorba);
    expect(history.location.pathname).toEqual('/meals/52977');
  });
  test('when clicking in a Drink Recipe, redirect to new Details URL', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseDrinks)
        .mockResolvedValueOnce(drinkCategories),
    });

    const { history } = renderWithRouter(<App />, '/drinks');
    const getGG = await screen.findByAltText(/GG/i);
    expect(getGG).toBeInTheDocument();
    userEvent.click(getGG);
    expect(history.location.pathname).toEqual('/drinks/15997');
  });
});
