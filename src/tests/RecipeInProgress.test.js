import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import { DETAILED_DRINK_PATH, WHITE_HEART, BLACK_HEART, DETAILED_MEAL_PATH } from '../helpers/constants';

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
    renderWithRouter(<App />, '/meals/52771/in-progress');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('Components Drink Details is rendered', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    renderWithRouter(<App />, `${DETAILED_DRINK_PATH}/in-progress`);
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
    renderWithRouter(<App />, `${DETAILED_DRINK_PATH}/in-progress`);
    const getShareBtn = await screen.findByTestId('share-btn');
    expect(getShareBtn).toBeInTheDocument();
    userEvent.click(getShareBtn);
    const linkCopiedText = await screen.findByText('Link copied!');
    expect(linkCopiedText).toBeInTheDocument();
  });
  test('component Meal is favorited', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    renderWithRouter(<App />, '/meals/52771/in-progress');
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

    renderWithRouter(<App />, '/drinks/178319/in-progress');
    const favBtn = await screen.findByTestId('favorite-btn');
    const checkFavInLS = JSON.parse(global.localStorage.getItem('favoriteRecipes'));
    expect(checkFavInLS[0].name).toBe('Aquamarine');
    expect(favBtn.src).toBe(BLACK_HEART);
    userEvent.click(favBtn);
    expect(favBtn.src).toBe(WHITE_HEART);
    userEvent.click(favBtn);
    expect(favBtn.src).toBe(BLACK_HEART);
  });

  test('Components Drink is checked', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    renderWithRouter(<App />, `${DETAILED_DRINK_PATH}/in-progress`);
    const checkBoxBtn = await screen.findByRole('checkbox', {
      name: /Banana Liqueur 1 oz/i,
    });
    expect(checkBoxBtn).toBeInTheDocument();
    userEvent.click(checkBoxBtn);
    expect(checkBoxBtn).toBeChecked();
    userEvent.click(checkBoxBtn);
    expect(checkBoxBtn).not.toBeChecked();
  });

  test('Components Drink is clicked', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouter(<App />, `${DETAILED_DRINK_PATH}/in-progress`);
    const checkBoxBtn0 = await screen.findByRole('checkbox', {
      name: /Hpnotiq 2 oz/i,
    });
    expect(checkBoxBtn0).toBeInTheDocument();
    userEvent.click(checkBoxBtn0);
    expect(checkBoxBtn0).toBeChecked();

    const checkBoxBtn1 = await screen.findByRole('checkbox', {
      name: /Pineapple Juice 1 oz/i,
    });
    expect(checkBoxBtn1).toBeInTheDocument();
    userEvent.click(checkBoxBtn1);
    expect(checkBoxBtn1).toBeChecked();

    const checkBoxBtn2 = await screen.findByRole('checkbox', {
      name: /Banana Liqueur 1 oz/i,
    });
    expect(checkBoxBtn2).toBeInTheDocument();
    userEvent.click(checkBoxBtn2);
    expect(checkBoxBtn2).toBeChecked();

    const doneClickBtn = await screen.findByTestId('finish-recipe-btn');
    expect(doneClickBtn).toBeInTheDocument();
    userEvent.click(doneClickBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Components Meal is clicked', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouter(<App />, `${DETAILED_MEAL_PATH}/in-progress`);
    const checkBoxBtn0 = await screen.findByRole('checkbox', {
      name: /penne rigate/i,
    });
    expect(checkBoxBtn0).toBeInTheDocument();
    userEvent.click(checkBoxBtn0);
    expect(checkBoxBtn0).toBeChecked();

    const checkBoxBtn1 = await screen.findByRole('checkbox', {
      name: /olive oil/i,
    });
    expect(checkBoxBtn1).toBeInTheDocument();
    userEvent.click(checkBoxBtn1);
    expect(checkBoxBtn1).toBeChecked();

    const checkBoxBtn2 = await screen.findByRole('checkbox', {
      name: /garlic 3 cloves/i,
    });
    expect(checkBoxBtn2).toBeInTheDocument();
    userEvent.click(checkBoxBtn2);
    expect(checkBoxBtn2).toBeChecked();

    const checkBoxBtn3 = await screen.findByRole('checkbox', {
      name: /chopped tomatoes 1 tin/i,
    });
    expect(checkBoxBtn3).toBeInTheDocument();
    userEvent.click(checkBoxBtn3);
    expect(checkBoxBtn3).toBeChecked();

    const checkBoxBtn4 = await screen.findByRole('checkbox', {
      name: /red chile flakes/i,
    });
    expect(checkBoxBtn4).toBeInTheDocument();
    userEvent.click(checkBoxBtn4);
    expect(checkBoxBtn4).toBeChecked();

    const checkBoxBtn5 = await screen.findByRole('checkbox', {
      name: /italian seasoning/i,
    });
    expect(checkBoxBtn5).toBeInTheDocument();
    userEvent.click(checkBoxBtn5);
    expect(checkBoxBtn5).toBeChecked();

    const checkBoxBtn6 = await screen.findByRole('checkbox', {
      name: /basil/i,
    });
    expect(checkBoxBtn6).toBeInTheDocument();
    userEvent.click(checkBoxBtn6);
    expect(checkBoxBtn6).toBeChecked();

    const checkBoxBtn7 = await screen.findByRole('checkbox', {
      name: /Parmigiano-Reggiano spinkling/i,
    });
    expect(checkBoxBtn7).toBeInTheDocument();
    userEvent.click(checkBoxBtn7);
    expect(checkBoxBtn7).toBeChecked();

    const doneClickBtn = await screen.findByTestId('finish-recipe-btn');
    expect(doneClickBtn).toBeInTheDocument();
    userEvent.click(doneClickBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
