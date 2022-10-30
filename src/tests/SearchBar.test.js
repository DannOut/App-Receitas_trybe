import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import baseMeals from '../../cypress/mocks/meals';
import baseDrinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import beefMeals from '../../cypress/mocks/beefMeals';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';

import {
  TEST_ID_TOP_HEADER_SEARCH,
  TEST_ID_SEARCHBAR_INPUT,
  TEST_ID_SEARCHBAR_BTN,
  TEST_ID_SEARCHBAR_FL_FILTER,
  TEST_ID_SEARCHBAR_NAME_FILTER,
  TEST_ID_SEARCHBAR_ING_FILTER,
  TEST_ID_HEADER_BOTTON,
  TEST_CARD_RECIPE_CARD_ZERO,
} from '../helpers/constants';

describe('Tests for the SearchBar component', () => {
  test('If the searchbar is rendered correctly', async () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');

    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    userEvent.click(searchBtn);
    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    expect(searchInput).toBeInTheDocument();
  });
  test('If the searchbar has all the inputs', async () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    userEvent.click(searchBtn);

    const searchBarIngredientFilter = await screen
      .findByTestId(TEST_ID_SEARCHBAR_ING_FILTER);
    expect(searchBarIngredientFilter).toBeInTheDocument();

    const searchBarNameFilter = await screen.findByTestId(TEST_ID_SEARCHBAR_NAME_FILTER);
    expect(searchBarNameFilter).toBeInTheDocument();

    const searchBarFirstLetterFilter = await screen
      .findByTestId(TEST_ID_SEARCHBAR_FL_FILTER);
    expect(searchBarFirstLetterFilter).toBeInTheDocument();

    const searchBarButton = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    expect(searchBarButton).toBeInTheDocument();
  });
  test('if is possible to search one drink ingredient', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseDrinks)
        .mockResolvedValue(drinkCategories)
        .mockResolvedValue(ginDrinks),
    });

    const { history } = renderWithRouter(<App />, '/drinks');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const headerBotton = await screen.findByTestId(TEST_ID_HEADER_BOTTON);
    expect(headerBotton).toBeInTheDocument();

    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    userEvent.type(searchInput, 'gin');

    const ingredientSearch = await screen.findByTestId(TEST_ID_SEARCHBAR_ING_FILTER);
    userEvent.click(ingredientSearch);

    const execSearchBtn = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    userEvent.click(execSearchBtn);

    const getDrink = await screen.findByTestId(TEST_CARD_RECIPE_CARD_ZERO);
    expect(getDrink).toBeInTheDocument();
    userEvent.click(getDrink);
    expect(history.location.pathname).toBe('/drinks/11410');
  });

  test('if is possible to search one meal ingredient', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseMeals)
        .mockResolvedValue(mealCategories)
        .mockResolvedValue(beefMeals),
    });

    const { history } = renderWithRouter(<App />, '/meals');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const headerBotton = await screen.findByTestId(TEST_ID_HEADER_BOTTON);
    expect(headerBotton).toBeInTheDocument();

    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    userEvent.type(searchInput, 'beef');

    const ingredientSearch = await screen.findByTestId(TEST_ID_SEARCHBAR_ING_FILTER);
    userEvent.click(ingredientSearch);

    const execSearchBtn = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    userEvent.click(execSearchBtn);

    const getDrink = await screen.findByTestId(TEST_CARD_RECIPE_CARD_ZERO);
    expect(getDrink).toBeInTheDocument();
    userEvent.click(getDrink);
    expect(history.location.pathname).toBe('/meals/52874');
  });

  test('if is possible to search one meal name', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseMeals)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(oneMeal),
    });

    /* const { history } =  */renderWithRouter(<App />, '/meals');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const headerBotton = await screen.findByTestId(TEST_ID_HEADER_BOTTON);
    expect(headerBotton).toBeInTheDocument();

    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    userEvent.type(searchInput, 'Spicy Arrabiata');

    const nameSearch = await screen.findByTestId(TEST_ID_SEARCHBAR_NAME_FILTER);
    userEvent.click(nameSearch);

    const execSearchBtn = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledTimes(3);
    // expect(history.location.pathname).toBe('/meals/52771');
  });

  test('if is possible to search one Drink name', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseDrinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValue(oneDrink),
    });

    renderWithRouter(<App />, '/drinks');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const headerBotton = await screen.findByTestId(TEST_ID_HEADER_BOTTON);
    expect(headerBotton).toBeInTheDocument();

    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    userEvent.type(searchInput, 'Aquamarine');

    const nameSearch = await screen.findByTestId(TEST_ID_SEARCHBAR_NAME_FILTER);
    userEvent.click(nameSearch);

    const execSearchBtn = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  test('if is possible to search Meal Letter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseMeals)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(emptyMeals),
    });

    /* const { history } =  */renderWithRouter(<App />, '/meals');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const headerBotton = await screen.findByTestId(TEST_ID_HEADER_BOTTON);
    expect(headerBotton).toBeInTheDocument();

    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    userEvent.type(searchInput, 'A');

    const nameSearch = await screen.findByTestId(TEST_ID_SEARCHBAR_FL_FILTER);
    userEvent.click(nameSearch);

    const execSearchBtn = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledTimes(3);
    // expect(history.location.pathname).toBe('/meals/52771');
  });

  test('if is possible to search Drink Letter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseDrinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValue(emptyDrinks),
    });

    renderWithRouter(<App />, '/drinks');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const headerBotton = await screen.findByTestId(TEST_ID_HEADER_BOTTON);
    expect(headerBotton).toBeInTheDocument();

    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    userEvent.type(searchInput, 'A');

    const nameSearch = await screen.findByTestId(TEST_ID_SEARCHBAR_FL_FILTER);
    userEvent.click(nameSearch);

    const execSearchBtn = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  test('if is possible to search Meal Letter Error', async () => {
    jest.spyOn(global, 'alert');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseMeals)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(emptyMeals),
    });

    /* const { history } =  */renderWithRouter(<App />, '/meals');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const headerBotton = await screen.findByTestId(TEST_ID_HEADER_BOTTON);
    expect(headerBotton).toBeInTheDocument();

    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    userEvent.type(searchInput, 'AB');

    const execSearchBtn = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    userEvent.click(execSearchBtn);

    expect(global.alert).toHaveBeenCalled();
  });

  test('if is possible to search Drink Letter Error', async () => {
    jest.spyOn(global, 'alert');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(baseDrinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValue(emptyDrinks),
    });

    renderWithRouter(<App />, '/drinks');
    const searchBtn = await screen.findByTestId(TEST_ID_TOP_HEADER_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const headerBotton = await screen.findByTestId(TEST_ID_HEADER_BOTTON);
    expect(headerBotton).toBeInTheDocument();

    const searchInput = await screen.findByTestId(TEST_ID_SEARCHBAR_INPUT);
    userEvent.type(searchInput, 'AB');

    const execSearchBtn = await screen.findByTestId(TEST_ID_SEARCHBAR_BTN);
    userEvent.click(execSearchBtn);
    expect(global.alert).toHaveBeenCalled();
  });
});
