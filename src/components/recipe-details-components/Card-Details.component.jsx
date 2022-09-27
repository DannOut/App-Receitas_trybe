import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

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
  const { ingredients, measures } = ingredientsAndRecipes;

  const renderMeasures = () => ingredients.map((val, index) => (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${val} ${measures[index]}`}
    </li>
  ));

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
        </section>
      )
  );
}

CardDetails.defaultProps = {
  strCategory: '',
  ingredientsAndRecipes: '',
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
  ingredientsAndRecipes: PropTypes.shape(),
  strInstructions: PropTypes.string,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strYoutube: PropTypes.string,
  strAlcoholic: PropTypes.string,
};

export default CardDetails;
