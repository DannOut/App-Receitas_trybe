import { getFromLocalStorage } from './localStorage';

export const recipeIsDone = (localStorageKey, idUrl) => {
  const data = getFromLocalStorage(localStorageKey) || [];
  const isDone = data.some(({ id }) => id === idUrl);
  return isDone;
};

export const value = 'value';
