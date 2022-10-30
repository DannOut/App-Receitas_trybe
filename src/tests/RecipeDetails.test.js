import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import { DETAILED_DRINK_PATH, WHITE_HEART, BLACK_HEART } from '../helpers/constants';

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
  test('Components Meal Details is rendered', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    renderWithRouter(<App />, '/meals/52771');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('Components Drink Details is rendered', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    renderWithRouter(<App />, DETAILED_DRINK_PATH);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Components Drink is Shared', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    renderWithRouter(<App />, DETAILED_DRINK_PATH);
    const getShareBtn = await screen.findByTestId('share-btn');
    expect(getShareBtn).toBeInTheDocument();
    userEvent.click(getShareBtn);
    const linkCopiedText = await screen.findByText('Link copied!');
    expect(linkCopiedText).toBeInTheDocument();
  });

  test('Components Drink is in progress', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    global.localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        178319: ['Hpnotiq', 'Pineapple Juice', 'Banana Liqueur'],
      },
    }));

    const { history } = renderWithRouter(<App />, '/drinks/178319');
    const inProgressRecipe = await screen.findByTestId('start-recipe-btn');
    expect(inProgressRecipe).toHaveTextContent('Continue Recipe');
    userEvent.click(inProgressRecipe);
    expect(history.location.pathname).toEqual('/drinks/178319/in-progress');
  });
  test('component Meal is favorited', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    renderWithRouter(<App />, '/meals/52771');
    const favBtn = await screen.findByTestId('favorite-btn');
    expect(favBtn.src).toBe(WHITE_HEART);

    userEvent.click(favBtn);
    const checkFavInLS = JSON.parse(global.localStorage.getItem('favoriteRecipes'));
    expect(checkFavInLS[0].name).toBe('Spicy Arrabiata Penne');
    expect(favBtn.src).toBe(BLACK_HEART);

    userEvent.click(favBtn);
    const rmdFavInLS = JSON.parse(global.localStorage.getItem('favoriteRecipes'));
    expect(rmdFavInLS).toHaveLength(0);
    expect(favBtn.src).toBe(WHITE_HEART);
  });

  test('Components Drink is favorited', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    global.localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail Alcoholic',
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    }]));

    renderWithRouter(<App />, '/drinks/178319');
    const favBtn = await screen.findByTestId('favorite-btn');
    const checkFavInLS = JSON.parse(global.localStorage.getItem('favoriteRecipes'));
    expect(checkFavInLS[0].name).toBe('Aquamarine');
    expect(favBtn.src).toBe(BLACK_HEART);
    userEvent.click(favBtn);
    expect(favBtn.src).toBe(WHITE_HEART);
    userEvent.click(favBtn);
    expect(favBtn.src).toBe(BLACK_HEART);
  });
});
