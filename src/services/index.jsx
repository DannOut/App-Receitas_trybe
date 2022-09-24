import {
  URL_DRINK_WITHOUT_ENDPOINT,
  URL_MEALS_WITHOUT_ENDPOINT,
} from './URLs_constants';

export const fetchMeals = async () => {
  const response = await fetch(URL_MEALS_WITHOUT_ENDPOINT);
  const data = await response.json();
  return data;
};

export const fetchDrinks = async () => {
  const response = await fetch(URL_DRINK_WITHOUT_ENDPOINT);
  const data = await response.json();
  return data;
};
