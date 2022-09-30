import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import { saveLocalStorage, getFromLocalStorage } from '../helpers/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  // const { location: { pathname } } = useHistory();

  useEffect(() => {
    const favoriteRecipesFromLocalStorage = getFromLocalStorage('favoriteRecipes') || [];
    setFavoriteRecipes(favoriteRecipesFromLocalStorage);
  }, []);

  if (filter.length < favoriteRecipes.length) {
    setFilter(favoriteRecipes);
  }

  const onClickHandler = ({ target }) => {
    const filtering = target.value;
    const filterFavoriteRecipes = filter
      .filter(({ type }) => filtering === 'all' || type === filtering);
    setFavoriteRecipes(filterFavoriteRecipes);
  };

  const copyToClipBoard = (target) => {
    if (target.name === 'meal') {
      copy(`http://localhost:3000/meals/${target.id}`);
    } else {
      copy(`http://localhost:3000/drinks/${target.id}`);
    }
    setIsCopied(target.id);
  };

  // const saveAndFavoriteRecipe = (target) => {
  //   saveLocalStorage('favoriteRecipes', saveFavoriteHandler(target));
  //   setIsFavorited(true);
  // };

  const handleFavorite = (target) => {
    console.log(target.name);
    const localStorageChecker = getFromLocalStorage('favoriteRecipes');
    const updatedFavoriteRecipes = localStorageChecker
      .filter(({ id }) => id !== target.id);
    saveLocalStorage('favoriteRecipes', updatedFavoriteRecipes);
    setFavoriteRecipes(updatedFavoriteRecipes);
  };

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          value="all"
          onClick={ (e) => onClickHandler(e) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          value="meal"
          onClick={ (e) => onClickHandler(e) }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          value="drink"
          onClick={ (e) => onClickHandler(e) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {favoriteRecipes.map((
        {
          image,
          category,
          name,
          nationality,
          alcoholicOrNot,
          type,
          id,
        },
        index,
      ) => (
        <div key={ `${index}` } className="done-recipe-card">
          <h1
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h1>
          <input
            type="image"
            src={ image }
            alt={ name }
            className="done-recipe-image"
            // onClick={ () => console.log('teste') }
            data-testid={ `${index}-horizontal-image` }
          />
          <div
            data-testid={ `${index}-horizontal-top-text` }
          >
            { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
          </div>
          <input
            type="image"
            alt="favorite"
            name={ type }
            id={ id }
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ ({ target }) => handleFavorite(target) }
            src={ blackHeartIcon }
          />
          <input
            type="image"
            src={ shareIcon }
            name={ type }
            id={ id }
            alt="share"
            onClick={ ({ target }) => copyToClipBoard(target) }
            data-testid={ `${index}-horizontal-share-btn` }
          />
          { isCopied === id ? <p> Link copied! </p> : null }
        </div>
      ))}

    </div>
  );
}

export default FavoriteRecipes;
