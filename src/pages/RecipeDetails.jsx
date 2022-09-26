/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FetchContext from '../context/FetchContext';
import Meals from './Meals';
import Drinks from './Drinks';
import { MEALS_URL_BASE,
  MEALS_URL_DETAILS_ENDPOINT,
  DRINKS_URL_BASE, DRINKS_URL_DETAILS_ENDPOINT } from '../helpers/constants';

// import PropTypes from 'prop-types';

function RecipeDetails() {
  const {
    recipeDetails,
    getRecipeDetails,
  } = useContext(FetchContext);
  const { food, strMeal, strMealThumb, idMeal,
    strDrink, strDrinkThumb, idDrink } = recipeDetails;
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  const renderDetails = async () => {
    if (pathname.includes('meals')) {
      const meal = await getRecipeDetails(
        `${MEALS_URL_BASE}/${MEALS_URL_DETAILS_ENDPOINT}${id}`,
      );
      return meal;
    }

    if (pathname.includes('drinks')) {
      const drink = await getRecipeDetails(
        `${DRINKS_URL_BASE}/${DRINKS_URL_DETAILS_ENDPOINT}${id}`,
      );
      return drink;
    }
    return 0;
  };

  useEffect(() => {
    renderDetails();
  }, [id]);

  return (
    (food === 'meal')
      ? (
        <section>
          <Meals
            strMeal={ strMeal }
            strMealThumb={ strMealThumb }
            idMeal={ idMeal }
          />
        </section>
      )
      : (
        <section>
          <Drinks
            strDrink={ strDrink }
            strDrinkThumb={ strDrinkThumb }
            idDrink={ idDrink }
          />
        </section>
      )
  );
}

// RecipeDetails.propTypes = {};

export default RecipeDetails;
