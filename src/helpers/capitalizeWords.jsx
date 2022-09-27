// REF: https://stackoverflow.com/questions/42755664/capitalize-first-letter-of-each-word-in-js
const capitalizeWords = (str) => str
  .replace('/', '')
  .replace('-', ' ')
  .split(' ')
  .map((word) => word[0].toUpperCase() + word.substr(1))
  .join(' ');

export default capitalizeWords;
