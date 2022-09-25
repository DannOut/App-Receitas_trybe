import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';
import { DRINKS_LINK, MEALS_LINK } from '../helpers/constants';
import FetchContext from '../context/FetchContext';
import {
  URL_MEALS_WITHOUT_ENDPOINT,
  URL_DRINK_WITHOUT_ENDPOINT } from '../services/URLs_constants';
// import PropTypes from 'prop-types';

function Recipes() {
  const { location: { pathname } } = useHistory();
  const {
    recipes,
    getApiInfo,
  } = useContext(FetchContext);
  // const [loading, isLoading] = useState(true);

  useEffect(() => {
    if (pathname === MEALS_LINK) {
      getApiInfo(URL_MEALS_WITHOUT_ENDPOINT);
    }
    if (pathname === DRINKS_LINK) {
      getApiInfo(URL_DRINK_WITHOUT_ENDPOINT);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // if (loading) {
  //   return (<p> Loading... </p>);
  // }
  return (
    <main>
      { (pathname === MEALS_LINK)
        ? (
          recipes.map(({ strMeal }, index) => (
            <section key={ index }>
              <Meals
                strMeal={ strMeal }
              />
            </section>
          ))
        )
        : (
          recipes.map(({ strDrink }, index) => (
            <section key={ index }>
              <Drinks
                strDrink={ strDrink }
              />
            </section>
          ))
        ) }
    </main>
  );
}

// Drinks.propTypes = {};

export default Recipes;
