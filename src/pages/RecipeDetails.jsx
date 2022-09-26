import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
// import PropTypes from 'prop-types';

function RecipeDetails() {
  const {
    recipeDetails,
  } = useContext(FetchContext);
  const { food } = recipeDetails;

  return (
    (food === 'meal')
      ? <div> Recipe Meal Details </div>
      : <div> Recipe Drink Details </div>
  );
}

// RecipeDetails.propTypes = {};

export default RecipeDetails;
