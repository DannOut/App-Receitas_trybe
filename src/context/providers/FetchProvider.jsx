import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../FetchContext';
import { fetchAPI } from '../../services';

function FetchProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const getApiInfo = async (url) => {
    const response = await fetchAPI(url);
    const value = await Object.values(response)[0];
    setRecipes(value);
  };

  const context = {
    recipes,
    getApiInfo,
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
