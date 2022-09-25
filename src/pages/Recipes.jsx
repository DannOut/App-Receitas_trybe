import React from 'react';
import { useHistory } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';
import { MEALS_LINK } from '../helpers/constants';
// import FetchContext from '../context/FetchContext';
// import PropTypes from 'prop-types';

function Recipes() {
  const { location: { pathname } } = useHistory();
  // const {
  //   fetchMeals,
  //   fetchDrinks,
  //   // setFetchMeals,
  //   // setFetchDrinks,
  // } = useContext(FetchContext);

  return (
    <main>
      { (pathname === MEALS_LINK)
        ? (
          <Meals />
          // fetchMeals.map(({ strMeal }, index) => (
          //   <section key={ index }>
          //     <Meals
          //       value={ strMeal }
          //     />
          //   </section>
          // ))
        )
        : (
          <Drinks />
          // fetchDrinks.map(({ strDrink }, index) => (
          //   <section key={ index }>
          //     <Drinks
          //       value={ strDrink }
          //     />
          //   </section>
          // ))
        ) }
    </main>
  );
}

// Drinks.propTypes = {};

export default Recipes;
