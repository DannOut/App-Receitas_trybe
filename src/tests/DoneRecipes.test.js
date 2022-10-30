import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import { HORIZONTAL_NAME_1, HORIZONTAL_NAME_0, DONE_RECIPES, DETAILED_MEAL_PATH,
  TEST_FILTER_MEAL, TEST_FILTER_DRINK, TEXT_0_HORIZONTAL_SHARE } from '../helpers/constants';

describe('Testing Done Page with Components', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage.clear();
    global.localStorage = localStorageMock;
  });

  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      tags: ['teste', 'teste'],
      doneDate: '23/9/2020',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      tags: ['teste', 'teste'],
      doneDate: '23/9/2020',
    },
  ];

  test('should render Done page and redirect', async () => {
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(oneMeal),
    // });

    global.localStorage.setItem('doneRecipes', JSON.stringify(
      doneRecipes,
    ));

    const { history } = renderWithRouter(<App />, DONE_RECIPES);

    const mealButton = screen.getByTestId(TEST_FILTER_MEAL);
    expect(mealButton).toBeInTheDocument();

    const drinkButton = screen.getByTestId(TEST_FILTER_DRINK);
    expect(drinkButton).toBeInTheDocument();

    const horizontalImage = screen.getByTestId('0-horizontal-image');
    expect(horizontalImage).toBeInTheDocument();

    const horizontalTopText = screen.getByTestId('0-horizontal-top-text');
    expect(horizontalTopText).toBeInTheDocument();

    const horizontalName = screen.getByTestId(HORIZONTAL_NAME_0);
    expect(horizontalName).toBeInTheDocument();

    const shareButton = screen.getByTestId(TEXT_0_HORIZONTAL_SHARE);
    expect(shareButton).toBeInTheDocument();

    const horizontalImage1 = screen.getByTestId('1-horizontal-image');
    expect(horizontalImage1).toBeInTheDocument();

    const horizontalTopText1 = screen.getByTestId('1-horizontal-top-text');
    expect(horizontalTopText1).toBeInTheDocument();

    const horizontalName1 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName1).toBeInTheDocument();

    const shareButton1 = screen.getByTestId('1-horizontal-share-btn');
    expect(shareButton1).toBeInTheDocument();

    userEvent.click(horizontalImage);
    expect(history.location.pathname).toBe(DETAILED_MEAL_PATH);
  });

  test('should render Done page and redirect', async () => {
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(oneMeal),
    // });

    global.localStorage.setItem('doneRecipes', JSON.stringify(
      doneRecipes,
    ));

    const { history } = renderWithRouter(<App />, DONE_RECIPES);
    const allButton = screen.getByTestId('filter-by-all-btn');
    expect(allButton).toBeInTheDocument();

    const mealButton = screen.getByTestId(TEST_FILTER_MEAL);
    expect(mealButton).toBeInTheDocument();

    const drinkButton = screen.getByTestId(TEST_FILTER_DRINK);
    expect(drinkButton).toBeInTheDocument();

    const horizontalImage = screen.getByTestId('0-horizontal-image');
    expect(horizontalImage).toBeInTheDocument();

    const horizontalTopText = screen.getByTestId('0-horizontal-top-text');
    expect(horizontalTopText).toBeInTheDocument();

    const horizontalName = screen.getByTestId(HORIZONTAL_NAME_0);
    expect(horizontalName).toBeInTheDocument();

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    const horizontalImage1 = screen.getByTestId('1-horizontal-image');
    expect(horizontalImage1).toBeInTheDocument();

    const horizontalTopText1 = screen.getByTestId('1-horizontal-top-text');
    expect(horizontalTopText1).toBeInTheDocument();

    const horizontalName1 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName1).toBeInTheDocument();

    const shareButton1 = screen.getByTestId('1-horizontal-share-btn');
    expect(shareButton1).toBeInTheDocument();

    userEvent.click(horizontalName);
    expect(history.location.pathname).toBe(DETAILED_MEAL_PATH);
  });

  test('if filter button are working', async () => {
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(oneMeal),
    // });

    global.localStorage.setItem('doneRecipes', JSON.stringify(
      doneRecipes,
    ));

    renderWithRouter(<App />, DONE_RECIPES);

    const horizontalName = screen.getByTestId(HORIZONTAL_NAME_0);
    expect(horizontalName).toBeInTheDocument();
    const horizontalName1 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName1).toBeInTheDocument();

    const mealButton = screen.getByTestId('filter-by-meal-btn');
    expect(mealButton).toBeInTheDocument();
    userEvent.click(mealButton);

    expect(horizontalName1).not.toBeInTheDocument();
    expect(horizontalName).toBeInTheDocument();

    const allButton = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allButton);

    expect(horizontalName).toBeInTheDocument();
    const horizontalName2 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName2).toBeInTheDocument();

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkButton);
  });

  test('Components done Recipe is Shared', () => {
    global.localStorage.setItem('doneRecipes', JSON.stringify(
      doneRecipes,
    ));
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    renderWithRouter(<App />, DONE_RECIPES);
    const getShareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(getShareBtn).toBeInTheDocument();
    userEvent.click(getShareBtn);
    const linkCopiedText = screen.getAllByText('Link copied!');
    expect(linkCopiedText[0]).toBeInTheDocument();
  });

  test('Components done Recipe is RENDERE when LOCAL STORAGE is Empty', () => {
    renderWithRouter(<App />, DONE_RECIPES);
    const mealButton = screen.getByTestId(TEST_FILTER_MEAL);
    expect(mealButton).toBeInTheDocument();

    const drinkButton = screen.getByTestId(TEST_FILTER_DRINK);
    expect(drinkButton).toBeInTheDocument();
  });

  test('Components Meal Details is rendered', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    global.localStorage.setItem('doneRecipes', JSON.stringify(
      doneRecipes,
    ));
    renderWithRouter(<App />, DETAILED_MEAL_PATH);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    waitFor(() => {
      const done = screen.queryByTestId('start-recipe-btn');
      expect(done).toBeNull();
    });
  });
});
