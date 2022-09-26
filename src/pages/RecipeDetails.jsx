import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import Meals from './Meals';
import Drinks from './Drinks';
// import PropTypes from 'prop-types';

function RecipeDetails() {
  const {
    recipeDetails,
  } = useContext(FetchContext);
  const { food, strMeal, strMealThumb, idMeal,
    strDrink, strDrinkThumb, idDrink } = recipeDetails;
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
