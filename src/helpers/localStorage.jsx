export const saveLocalStorage = (keyName, value) => {
  localStorage.setItem(keyName, JSON.stringify(value));
};

export const VALUE = 'VALUE';
