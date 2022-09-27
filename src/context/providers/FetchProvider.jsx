import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FetchContext from '../FetchContext';
import { fetchAPI } from '../../services';
import {
  MAX_LIMIT_INFORMATION,
  MAX_LIMIT_CATEGORY,
} from '../../helpers/constants';

function FetchProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const { location: { pathname } } = useHistory();

  const getCardsRecipesInfo = async (url) => {
    const response = await fetchAPI(url);
    const value = await Object.values(response)[0].slice(0, MAX_LIMIT_INFORMATION);
    console.log(value);
    setRecipes(value);
  };

  const getCardsRecipesInfoByCategory = async (url) => {
    const response = await fetchAPI(url);
    const value = await Object.values(response)[0].slice(0, MAX_LIMIT_INFORMATION);
    setFilter(value);
  };

  const getCategoriesInfo = async (url) => {
    const response = await fetchAPI(url);
    const value = await Object.values(response)[0].slice(0, MAX_LIMIT_CATEGORY);
    setCategories(value);
  };

  const getRecipeDetails = async (url) => {
    if (pathname.includes('meals')) {
      const { meals } = await fetchAPI(url);
      setRecipeDetails(meals[0]);
    }
    if (pathname.includes('drinks')) {
      const { drinks } = await fetchAPI(url);
      setRecipeDetails(drinks[0]);
    }
  };

  const context = {
    recipes,
    getCardsRecipesInfo,
    recipeDetails,
    getRecipeDetails,
    categories,
    getCategoriesInfo,
    filter,
    getCardsRecipesInfoByCategory,
    setRecipes,
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
