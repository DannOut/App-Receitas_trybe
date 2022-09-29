import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { /* saveLocalStorage,  */getFromLocalStorage } from '../helpers/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const favoriteRecipesFromLocalStorage = getFromLocalStorage('favoriteRecipes')
     || [];
    setFavoriteRecipes(favoriteRecipesFromLocalStorage);
  }, []);

  if (filter.length < favoriteRecipes.length) {
    setFilter(favoriteRecipes);
  }

  const onClickHandler = ({ target }) => {
    const filtering = target.value;
    console.log(filter);
    const filterFavoriteRecipes = filter
      .filter(({ type }) => filtering === 'all' || type === filtering);
    setFavoriteRecipes(filterFavoriteRecipes);
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
            data-testid={ `${index}-horizontal-favorite-btn` }
            // onClick={ () => console.log('teste') }
            src={ blackHeartIcon }
          />
          <input
            type="image"
            src={ shareIcon }
            alt="share"
            // onClick={ () => console.log('teste') }
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </div>
      ))}

    </div>
  );
}

export default FavoriteRecipes;
