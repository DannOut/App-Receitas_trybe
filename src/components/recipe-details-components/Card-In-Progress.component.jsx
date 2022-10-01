/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, Link } from 'react-router-dom';
import { getFromLocalStorage, saveLocalStorage } from '../../helpers/localStorage';
import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function CardInProgress({
  strCategory, ingredientsAndRecipes, idMeal, strInstructions, strMeal, strMealThumb,
  idDrink, strDrink, strDrinkThumb, strYoutube, strAlcoholic, strArea, strTags,
}) {
  const { location: { pathname } } = useHistory();
  const { id: idUrl } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { ingredients, measures } = ingredientsAndRecipes;
  const isMeal = pathname.includes('meals');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [checked, setChecked] = useState({
    [idUrl]: {},
  });
  const [finish, setFinish] = useState(true);

  useEffect(() => {
    const startLSFavorites = getFromLocalStorage('favoriteRecipes') || [];
    setFavoriteRecipes(startLSFavorites);
    const checkLSfavorites = startLSFavorites.some(({ id }) => id === idUrl);
    setIsFavorited(checkLSfavorites);
    const getChecksInLocalStorage = () => {
      const localS = localStorage.getItem('inProgressRecipes');
      const json = JSON.parse(localS);
      setChecked((prevState) => ({
        ...prevState,
        ...json,
      }));
    };
    getChecksInLocalStorage();
  }, []);

  useEffect(() => {
    const handleFinishButton = () => {
      const checkboxes = Object.values(checked[idUrl]).every((i) => i);
      const checksLength = Object.keys(checked[idUrl]).length === ingredients.length;
      if (checkboxes && checksLength) {
        setFinish(false);
      } else {
        setFinish(true);
      }
    };
    handleFinishButton();
    saveLocalStorage('inProgressRecipes', checked);
  }, [checked]);

  const handleCheckbox = ({ target }) => {
    const { id } = target;
    setChecked((prevState) => ({
      ...prevState,
      [idUrl]: {
        ...prevState[idUrl],
        [id]: !checked[idUrl][id],
      },
    }));
  };

  const renderMeasures = () => ingredients.map((val, index) => (
    <li key={ index }>
      <label
        htmlFor={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          id={ index }
          checked={ checked[idUrl][index] }
          onClick={ handleCheckbox }
          onChange={ (e) => e }
        />
        {
          checked[idUrl][index]
            ? <s>{` ${val} ${measures[index]}`}</s> : ` ${val} ${measures[index]}`
        }
      </label>
    </li>
  ));

  const saveFavoriteHandler = () => {
    const addRecipe = {
      id: isMeal ? idMeal : idDrink,
      type: isMeal ? 'meal' : 'drink',
      nationality: isMeal ? strArea : '',
      category: strCategory,
      alcoholicOrNot: isMeal ? '' : strAlcoholic,
      name: isMeal ? strMeal : strDrink,
      image: isMeal ? strMealThumb : strDrinkThumb,
    };
    return [...favoriteRecipes, addRecipe];
  };

  const removeFavoriteSelected = () => {
    const localStorageChecker = getFromLocalStorage('favoriteRecipes');
    const updatedFavoriteRecipes = localStorageChecker
      .filter(({ id }) => id !== idUrl);
    return updatedFavoriteRecipes;
  };

  const removeIconFavorite = () => {
    saveLocalStorage('favoriteRecipes', removeFavoriteSelected());
    setIsFavorited(false);
  };

  const saveAndFavoriteRecipe = () => {
    saveLocalStorage('favoriteRecipes', saveFavoriteHandler());
    setIsFavorited(true);
  };
  const handleFavorite = () => {
    if (isFavorited) return removeIconFavorite();
    saveAndFavoriteRecipe();
  };

  const copyToClipBoard = () => {
    const path = pathname;
    const recipePath = path.replace('/in-progress', '');
    copy(`http://localhost:3000${recipePath}`);
    setIsCopied(true);
  };

  const saveDoneHandler = () => {
    const doneRecipes = getFromLocalStorage('doneRecipes') || [];
    const addRecipe = {
      id: isMeal ? idMeal : idDrink,
      type: isMeal ? 'meal' : 'drink',
      nationality: isMeal ? strArea : '',
      category: strCategory,
      alcoholicOrNot: isMeal ? '' : strAlcoholic,
      name: isMeal ? strMeal : strDrink,
      image: isMeal ? strMealThumb : strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: strTags?.split(','),
    };

    return [...doneRecipes, addRecipe];
  };

  return (
    <section>
      <h1>Recipe in Progress</h1>
      <h1 data-testid="recipe-title">
        {isMeal ? strMeal : strDrink}
      </h1>
      <h3 data-testid="recipe-category">
        {isMeal ? strCategory : `${strCategory} ${strAlcoholic}`}
      </h3>
      <img
        src={ isMeal ? strMealThumb : strDrinkThumb }
        alt={ isMeal ? strMeal : strDrink }
        data-testid="recipe-photo"
      />
      <p data-testid="instructions">
        {strInstructions}
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
        onClick={ handleFavorite }
        src={ isFavorited ? blackHeart : whiteHeart }
        alt="SHARE"
      />
      {isCopied ? <p> Link copied! </p> : null}
      <ul>
        {renderMeasures()}
      </ul>
      {isMeal
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
      <Link to="/done-recipes">
        <button
          type="button"
          disabled={ finish }
          className="recipe_details__startbtn"
          data-testid="finish-recipe-btn"
          onClick={ () => { saveLocalStorage('doneRecipes', saveDoneHandler()); } }
        >
          Finish Recipe
        </button>
      </Link>
    </section>
  );
}

CardInProgress.defaultProps = {
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
  idMeal: '',
  idDrink: '',
  strArea: '',
  strTags: '',
};

CardInProgress.propTypes = {
  idMeal: PropTypes.string,
  idDrink: PropTypes.string,
  strArea: PropTypes.string,
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
  strTags: PropTypes.string,
  ingredientsAndRecipes: PropTypes.shape().isRequired,
};

export default CardInProgress;
