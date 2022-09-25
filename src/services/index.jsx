import {
  URL_DRINK_WITHOUT_ENDPOINT,
  URL_MEALS_WITHOUT_ENDPOINT,
} from './URLs_constants';

export const fetchMeals = async () => {
  try {
    const response = await fetch(URL_MEALS_WITHOUT_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchDrinks = async () => {
  try {
    const response = await fetch(URL_DRINK_WITHOUT_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
