import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { getFromLocalStorage } from '../helpers/localStorage';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // saveLocalStorage('doneRecipes', [{
    //   id: '52771',
    //   type: 'meal',
    //   nationality: 'Italian',
    //   category: 'Vegetarian',
    //   alcoholicOrNot: '',
    //   name: 'Spicy Arrabiata Penne',
    //   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //   doneDate: '23/9/2020',
    //   tags: ['naruto', 'kakashi'],
    // }]);
    const doneRecipesFromLocalStorage = getFromLocalStorage('doneRecipes') || [];
    setDoneRecipes(doneRecipesFromLocalStorage);
  }, []);

  const filterdoneRecipes = doneRecipes
    .filter(({ type }) => filter === 'all' || type === filter);
  console.log(filterdoneRecipes);
  const copyToClipBoard = ({ target: { dataset: { url } } }) => {
    copy(`http://localhost:3000/${url}`);
    setIsCopied(true);
  };

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          value="all"
          onClick={ ({ target }) => setFilter(target.value) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          value="meal"
          onClick={ ({ target }) => setFilter(target.value) }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          value="drink"
          onClick={ ({ target }) => setFilter(target.value) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {doneRecipes.map((
        {
          image,
          category,
          name,
          doneDate,
          nationality,
          alcoholicOrNot,
          tags,
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
            onClick={ () => console.log('teste') }
            data-testid={ `${index}-horizontal-image` }
          />
          <div
            data-testid={ `${index}-horizontal-top-text` }
          >
            { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
          </div>
          <div data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</div>
          <input
            type="image"
            src={ shareIcon }
            alt="share"
            data-url={ `${type}s/${id}` }
            onClick={ copyToClipBoard }
            data-testid={ `${index}-horizontal-share-btn` }
          />
          { isCopied ? <p> Link copied! </p> : null }
          { tags.map((val, ind) => (
            <h2 key={ ind } data-testid={ `${index}-${val}-horizontal-tag` }>
              { val }
            </h2>
          )) }
        </div>
      ))}

    </div>
  );
}

export default DoneRecipes;
