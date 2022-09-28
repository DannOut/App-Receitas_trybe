/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { getFromLocalStorage } from '../../helpers/localStorage';
import ButtonDetails from './Button-Details.components';

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
  const { ingredients, measures } = ingredientsAndRecipes;

  // useEffect(() => {
  //   saveLocalStorage('inProgressRecipes', ({
  //     drinks: {
  //       15997: ['Galliano', 'Ginger ale'],
  //     },
  //     meals: {
  //       52977: ['Lentils', 'Onion'],
  //     },
  //   }));
  // }, []);

  const renderMeasures = () => ingredients.map((val, index) => (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${val} ${measures[index]}`}
    </li>
  ));

  const recipeIsDone = () => {
    const data = getFromLocalStorage('doneRecipes') || [];
    const isDone = data.some(({ id }) => id === idUrl);
    return isDone;
  };

  const inProgressRecipe = () => {
    const data = getFromLocalStorage('inProgressRecipes') || {};
    const typeOfFood = pathname.includes('meals') ? data.meals : data.drinks;
    if (typeOfFood) {
      const isInProgress = Object.keys(typeOfFood)
        .some((inProgressId) => inProgressId === idUrl);
      console.log(isInProgress);
      return isInProgress;
    }
    return false;
  };

  const isDone = recipeIsDone();
  const inProgress = inProgressRecipe();
  console.log(inProgress);

  return (
    (pathname.includes('meals'))
      ? (
        <section>
          <h1 data-testid="recipe-title">
            {strMeal}
          </h1>
          <h3 data-testid="recipe-category">
            {strCategory}
          </h3>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid="recipe-photo"
          />
          <p data-testid="instructions">
            { strInstructions }
          </p>
          <ul>
            { renderMeasures() }
          </ul>
          <div>
            <iframe
              title={ strMeal }
              width="420"
              height="315"
              src={ strYoutube?.replace('watch?v=', 'embed/') }
              data-testid="video"
            />
          </div>
          {!isDone && <ButtonDetails inProgress={ inProgress } /> }
        </section>
      )
      : (
        <section>
          <h1 data-testid="recipe-title">
            {strDrink}
          </h1>
          <h3 data-testid="recipe-category">
            {strCategory}
            {strAlcoholic}
          </h3>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="instructions">
            { strInstructions }
          </p>
          <ul>
            { renderMeasures() }
          </ul>
          {!isDone && <ButtonDetails inProgress={ inProgress } /> }
        </section>
      )
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
