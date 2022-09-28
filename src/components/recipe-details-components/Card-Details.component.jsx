import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getFromLocalStorage, saveLocalStorage } from '../../helpers/localStorage';

function CardDetails({
  strCategory,
  ingredientsAndRecipes,
  strInstructions,
  idMeal,
  strMeal,
  strMealThumb,
  idDrink,
  strDrink,
  strDrinkThumb,
  strYoutube,
  strAlcoholic,
}) {
  const { location: { pathname } } = useHistory();
  const [recipesDoneLocalStorage, setRecipesDoneLocalStorage] = useState([]);
  const { ingredients, measures } = ingredientsAndRecipes;

  const renderMeasures = () => ingredients.map((val, index) => (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${val} ${measures[index]}`}
    </li>
  ));

  useEffect(() => {
    // saveLocalStorage('doneRecipes', ([{
    //   id: '15997',
    //   type: 'drink',
    //   nationality: '',
    //   category: '',
    //   alcoholicOrNot: 'Optional alcohol',
    //   name: 'GG',
    //   image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    //   doneDate: '',
    // },
    // {
    //   id: '52977',
    //   type: 'meal',
    //   nationality: '',
    //   category: '',
    //   alcoholicOrNot: '',
    //   name: 'Corba',
    //   image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    //   doneDate: '',
    // }]));
    if (getFromLocalStorage('doneRecipes') !== null) {
      const data = getFromLocalStorage('doneRecipes');
      setRecipesDoneLocalStorage(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkDoneRecipes = () => recipesDoneLocalStorage
    .some(({ id }) => id.includes(idDrink || idMeal));

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
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="recipe_details__startbtn"
            style={ { display: checkDoneRecipes() ? 'none' : 'block' } }
          >
            Start Recipe
          </button>
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
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="recipe_details__startbtn"
            style={ { display: checkDoneRecipes() ? 'none' : 'block' } }
          >
            Start Recipe
          </button>
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
  idDrink: '',
  idMeal: '',
};

CardDetails.propTypes = {
  strCategory: PropTypes.string,
  ingredients: PropTypes.string,
  measures: PropTypes.string,
  strInstructions: PropTypes.string,
  strMeal: PropTypes.string,
  idMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  idDrink: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strYoutube: PropTypes.string,
  strAlcoholic: PropTypes.string,
  ingredientsAndRecipes: PropTypes.shape().isRequired,
};

export default CardDetails;
