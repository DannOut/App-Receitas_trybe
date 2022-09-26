import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../FetchContext';
import { fetchAPI } from '../../services';
import { MAX_LIMIT_INFORMATION } from '../../helpers/constants';

function FetchProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const getCardsRecipesInfo = async (url) => {
    const response = await fetchAPI(url);
    const value = await Object.values(response)[0].slice(0, MAX_LIMIT_INFORMATION);
    setRecipes(value);
  };

  const context = {
    recipes,
    getCardsRecipesInfo,
  };

  return (
    <FetchContext.Provider value={ context }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FetchProvider;
