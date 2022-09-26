import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FetchContext from '../FetchContext';
import { fetchAPI } from '../../services';
import {
  MAX_LIMIT_INFORMATION,
  MAX_LIMIT_CATEGORY,
  MEALS_LINK,
  DRINKS_LINK } from '../../helpers/constants';

function FetchProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const { location: { pathname } } = useHistory();

  const getCardsRecipesInfo = async (url) => {
    const response = await fetchAPI(url);
    const value = await Object.values(response)[0].slice(0, MAX_LIMIT_INFORMATION);
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
    if (pathname === MEALS_LINK) {
      const { meals } = await fetchAPI(url);
      const value = { ...meals[0], food: 'meal' };
      setRecipeDetails(value);
    }
    if (pathname === DRINKS_LINK) {
      const { drinks } = await fetchAPI(url);
      const value = { ...drinks[0], food: 'drink' };
      setRecipeDetails(value);
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
