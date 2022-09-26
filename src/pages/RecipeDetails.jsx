import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FetchContext from '../context/FetchContext';
// import PropTypes from 'prop-types';

function RecipeDetails() {
  const history = useHistory();
  const {
    recipes,
    recipeDetails,
  } = useContext(FetchContext);

  console.log(history.location.pathname);
  console.log(recipes);
  console.log(recipeDetails);
  return (
    <div>RecipeDetails</div>
  );
}

// RecipeDetails.propTypes = {};

export default RecipeDetails;
