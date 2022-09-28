/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { getFromLocalStorage } from '../../helpers/localStorage';
import ButtonDetails from './Button-Details.components';
import { recipeIsDone } from '../../helpers';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardDetails({
  strCategory,
  ingredientsAndRecipes,
  strInstructions,
  strMeal,
  strMealThumb,
  strDrink,
  strDrinkThumb,
  strYoutube,
  strAlcoholic,
}) {
  const { location: { pathname } } = useHistory();
  const { id: idUrl } = useParams();
  const [copied, isCopied] = useState(false);
  const { ingredients, measures } = ingredientsAndRecipes;

  const renderMeasures = () => ingredients.map((val, index) => (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${val} ${measures[index]}`}
    </li>
  ));

  const inProgressRecipe = () => {
    const data = getFromLocalStorage('inProgressRecipes') || {};
    const typeOfFood = pathname.includes('meals') ? data.meals : data.drinks;
    if (typeOfFood) {
      const isInProgress = Object.keys(typeOfFood)
        .some((inProgressId) => inProgressId === idUrl);
      return isInProgress;
    }
    return false;
  };

  const redirectPageFunc = () => {
    if (pathname.includes('meals')) return `/meals/${idUrl}/in-progress`;
    return `/drinks/${idUrl}/in-progress`;
  };

  const copyToClipBoard = () => {
    copy(`http://localhost:3000${pathname}`);
    isCopied(true);
  };

  const isDone = recipeIsDone('doneRecipes', idUrl);
  const inProgress = inProgressRecipe();
  const redirectPage = redirectPageFunc();
  const isMeal = pathname.includes('meals');

  return (
    <section>
      <h1 data-testid="recipe-title">
        {isMeal ? strMeal : strDrink }
      </h1>
      <h3 data-testid="recipe-category">
        {isMeal ? strCategory : `${strCategory} ${strAlcoholic}` }
      </h3>
      <img
        src={ isMeal ? strMealThumb : strDrinkThumb }
        alt={ isMeal ? strMeal : strDrink }
        data-testid="recipe-photo"
      />
      <p data-testid="instructions">
        { strInstructions }
      </p>
      <input
        type="image"
        data-testid="share-btn"
        onClick={ copyToClipBoard }
        src={ shareIcon }
        alt="share icon"
      />
      <input
        type="image"
        data-testid="favorite-btn"
        onClick={ console.log('teste') }
        // src={ shareIcon }
        alt="SHARE"
      />
      { copied ? <p> Link copied! </p> : null }
      <ul>
        { renderMeasures() }
      </ul>
      { isMeal
        ? (
          <div>
            <iframe
              title={ strMeal }
              width="420"
              height="315"
              src={ strYoutube?.replace('watch?v=', 'embed/') }
              data-testid="video"
            />
          </div>
        ) : <p> Drink Placeholder </p>}
      {!isDone && <ButtonDetails
        inProgress={ inProgress }
        redirectPage={ redirectPage }
      /> }
    </section>
  );
}

CardDetails.defaultProps = {
  strCategory: '',
  ingredients: '',
  measures: '',
  strInstructions: '',
  strMeal: '',
  strMealThumb: '',
  strDrink: '',
  strDrinkThumb: '',
  strYoutube: '',
  strAlcoholic: '',
};

CardDetails.propTypes = {
  strCategory: PropTypes.string,
  ingredients: PropTypes.string,
  measures: PropTypes.string,
  strInstructions: PropTypes.string,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strYoutube: PropTypes.string,
  strAlcoholic: PropTypes.string,
  ingredientsAndRecipes: PropTypes.shape().isRequired,
};

export default CardDetails;
