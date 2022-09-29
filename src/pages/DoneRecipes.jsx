import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { saveLocalStorage, getFromLocalStorage } from '../helpers/localStorage';
import CardDetails from '../components/recipe-details-components/Card-Details.component';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    saveLocalStorage('doneRecipes', [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/9/2020',
      tags: ['naruto', 'kakashi'],
    }]);
    const doneRecipesFromLocalStorage = getFromLocalStorage('doneRecipes') || [];
    setDoneRecipes(doneRecipesFromLocalStorage);
  }, []);

  const filterdoneRecipes = doneRecipes
    .filter(({ type }) => filter === 'all' || type === filter);
  console.log(filterdoneRecipes);

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
    </div>
  );
}

export default DoneRecipes;
