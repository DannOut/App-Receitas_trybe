import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import FetchContext from '../FetchContext';
import { fetchAPI } from '../../services';
import {
  MAX_LIMIT_INFORMATION,
  MAX_LIMIT_CATEGORY,
  MIN_PASSWORD,
} from '../../helpers/constants';

function FetchProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);
  const [recomendations, setRecomendation] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const { pathname } = useLocation();

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
    const value = pathname.match(/meals|drinks/);
    const { [value]: toFetch } = await fetchAPI(url);
    return setRecipeDetails(toFetch[0]);
  };

  const getRecomendations = async (url) => {
    const response = await fetchAPI(url);
    const value = await Object.values(response)[0].slice(0, MIN_PASSWORD);
    setRecomendation(value);
  };

  const context = {
    recipes,
    getCardsRecipesInfo,
    recipeDetails,
    getRecipeDetails,
    categories,
    getCategoriesInfo,
    filter,
    setFilter,
    getCardsRecipesInfoByCategory,
    setRecipes,
    recomendations,
    getRecomendations,
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
