import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FetchContext from '../../context/FetchContext';
import {
  MEALS_URL_BASE,
  MEALS_URL_FILTER_ENDPOINT,
  DRINKS_URL_BASE,
  DRINKS_URL_FILTER_ENDPOINT,
  MEALS_LINK,
  MEALS_URL_DEFAULT_ENDPOINT,
  DRINKS_URL_DEFAULT_ENDPOINT,
} from '../../helpers/constants';

function Filter() {
  const { location: { pathname } } = useHistory();
  const { categories, getCardsRecipesInfoByCategory } = useContext(FetchContext);
  const [isFiltering, setIsFiltering] = useState('');

  const onclick = ({ target }) => {
    if (isFiltering !== target.name && target.name !== 'All') {
      if (pathname === MEALS_LINK) {
        getCardsRecipesInfoByCategory(
          `${MEALS_URL_BASE}/${MEALS_URL_FILTER_ENDPOINT}${target.name}`,
        );
      } else {
        getCardsRecipesInfoByCategory(
          `${DRINKS_URL_BASE}/${DRINKS_URL_FILTER_ENDPOINT}${target.name}`,
        );
      }
      setIsFiltering(target.name);
    } else {
      setIsFiltering('');
      if (pathname === MEALS_LINK) {
        getCardsRecipesInfoByCategory(`${MEALS_URL_BASE}/${MEALS_URL_DEFAULT_ENDPOINT}`);
      } else {
        getCardsRecipesInfoByCategory(
          `${DRINKS_URL_BASE}/${DRINKS_URL_DEFAULT_ENDPOINT}`,
        );
      }
    }
  };

  if (categories.length > 0) {
    return (
      <div>
        <button
          type="button"
          name="All"
          data-testid="All-category-filter"
          onClick={ onclick }
        >
          All
        </button>
        { categories.map((ele, index) => (
          <button
            key={ index }
            data-testid={ `${ele.strCategory}-category-filter` }
            name={ ele.strCategory }
            type="button"
            onClick={ onclick }
          >
            { ele.strCategory }
          </button>
        )) }
      </div>
    );
  }
  return (
    <div>Loading...</div>
  );
}

export default Filter;
