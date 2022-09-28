export const saveLocalStorage = (keyName, value) => localStorage
  .setItem(keyName, JSON.stringify(value));

export const getFromLocalStorage = (keyName) => JSON.parse(localStorage.getItem(keyName));
