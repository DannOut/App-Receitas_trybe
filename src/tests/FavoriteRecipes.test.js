import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import {
  HORIZONTAL_NAME_1,
  HORIZONTAL_NAME_0,
  LINK_COPIED,
  FAVORITE_LINK,
  FILTER_DRINK,
  HORIZONTAL_SHARE_1,
  FILTER_ALL,
  FILTER_MEAL } from '../helpers/constants';

describe('Testing Recipe Details Page with Components', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage.clear();
    global.localStorage = localStorageMock;
  });

  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  test('shuold render Favorite page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    global.localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes,
    ));

    renderWithRouter(<App />, FAVORITE_LINK);
    const allButton = screen.getByTestId(FILTER_ALL);
    expect(allButton).toBeInTheDocument();

    const mealButton = screen.getByTestId(FILTER_MEAL);
    expect(mealButton).toBeInTheDocument();

    const drinkButton = screen.getByTestId(FILTER_DRINK);
    expect(drinkButton).toBeInTheDocument();

    const horizontalImage = screen.getByTestId('0-horizontal-image');
    expect(horizontalImage).toBeInTheDocument();

    const horizontalTopText = screen.getByTestId('0-horizontal-top-text');
    expect(horizontalTopText).toBeInTheDocument();

    const horizontalName = screen.getByTestId(HORIZONTAL_NAME_0);
    expect(horizontalName).toBeInTheDocument();

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    const favButton = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favButton).toBeInTheDocument();

    const horizontalImage1 = screen.getByTestId('1-horizontal-image');
    expect(horizontalImage1).toBeInTheDocument();

    const horizontalTopText1 = screen.getByTestId('1-horizontal-top-text');
    expect(horizontalTopText1).toBeInTheDocument();

    const horizontalName1 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName1).toBeInTheDocument();

    const shareButton1 = screen.getByTestId(HORIZONTAL_SHARE_1);
    expect(shareButton1).toBeInTheDocument();

    const favButton1 = screen.getByTestId('1-horizontal-favorite-btn');
    expect(favButton1).toBeInTheDocument();
  });

  test('if filter button are working', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    global.localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes,
    ));

    renderWithRouter(<App />, FAVORITE_LINK);

    const horizontalName = screen.getByTestId(HORIZONTAL_NAME_0);
    expect(horizontalName).toBeInTheDocument();
    const horizontalName1 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName1).toBeInTheDocument();

    const mealButton = screen.getByTestId(FILTER_MEAL);
    expect(mealButton).toBeInTheDocument();
    userEvent.click(mealButton);

    expect(horizontalName1).not.toBeInTheDocument();
    expect(horizontalName).toBeInTheDocument();

    const allButton = screen.getByTestId(FILTER_ALL);
    userEvent.click(allButton);

    expect(horizontalName).toBeInTheDocument();
    const horizontalName2 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName2).toBeInTheDocument();

    const drinkButton = screen.getByTestId(FILTER_DRINK);
    userEvent.click(drinkButton);
  });

  test('if recepie can be unfavorited', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    global.localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes,
    ));

    renderWithRouter(<App />, FAVORITE_LINK);

    const horizontalName = screen.getByTestId(HORIZONTAL_NAME_0);
    expect(horizontalName).toBeInTheDocument();
    const horizontalName1 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName1).toBeInTheDocument();

    const favButton1 = screen.getByTestId('1-horizontal-favorite-btn');
    expect(favButton1).toBeInTheDocument();
    userEvent.click(favButton1);

    expect(horizontalName1).not.toBeInTheDocument();
    expect(horizontalName).toBeInTheDocument();
  });

  test('if meal recepie can be shared', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    global.localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes,
    ));
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, FAVORITE_LINK);

    const shareButton1 = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton1).toBeInTheDocument();
    userEvent.click(shareButton1);
    const linkCopiedText = await screen.findByText(LINK_COPIED);
    expect(linkCopiedText).toBeInTheDocument();
  });

  test('if drink recepie can be shared', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    global.localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes,
    ));

    renderWithRouter(<App />, FAVORITE_LINK);

    const shareButton1 = screen.getByTestId(HORIZONTAL_SHARE_1);
    expect(shareButton1).toBeInTheDocument();
    userEvent.click(shareButton1);
    const linkCopiedText = await screen.findByText('Link copied!');
    expect(linkCopiedText).toBeInTheDocument();
  });

  test('if when localStorage is empty no recipies render', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    renderWithRouter(<App />, FAVORITE_LINK);

    const allButton = screen.getByTestId(FILTER_ALL);
    expect(allButton).toBeInTheDocument();

    const mealButton = screen.getByTestId(FILTER_MEAL);
    expect(mealButton).toBeInTheDocument();

    const drinkButton = screen.getByTestId(FILTER_DRINK);
    expect(drinkButton).toBeInTheDocument();
  });
});
