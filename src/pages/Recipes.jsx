import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';
import FetchContext from '../context/FetchContext';
import SearchContext from '../context/SearchContext';
import Header from '../components/Header/Header';
import Filter from '../components/Filter-compoments/Filter.component';

import '../styles/Recipes.css';
import {
  MEALS_URL_BASE,
  MEALS_URL_DEFAULT_ENDPOINT,
  MEALS_LINK,
  DRINKS_URL_BASE,
  DRINKS_URL_DEFAULT_ENDPOINT,
  DRINKS_LINK,
  DRINKS_CATEGORY_LIST,
  MEALS_CATEGORY_LIST,
} from '../helpers/constants';
import Footer from './Footer';
// import Filter from '../components/Filter-compoments/Filter.component';
// import PropTypes from 'prop-types';

function Recipes() {
  const { location: { pathname } } = useHistory();
  const {
    recipes,
    getCardsRecipesInfo,
    getCategoriesInfo,
    filter,
    setRecipes,
  } = useContext(FetchContext);

  const { searchResults } = useContext(SearchContext);

  // const [loading, isLoading] = useState(true);
  useEffect(() => {
    if (filter.length > 0) {
      return setRecipes(filter);
    }
    if (pathname === MEALS_LINK) {
      getCardsRecipesInfo(`${MEALS_URL_BASE}/${MEALS_URL_DEFAULT_ENDPOINT}`);
      getCategoriesInfo(MEALS_CATEGORY_LIST);
    }
    if (pathname === DRINKS_LINK) {
      getCardsRecipesInfo(`${DRINKS_URL_BASE}/${DRINKS_URL_DEFAULT_ENDPOINT}`);
      getCategoriesInfo(DRINKS_CATEGORY_LIST);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, filter]);

  if (searchResults.length > 0) {
    return (
      <main>
        { (pathname === MEALS_LINK)
          ? (
            <section>
              <Header />
              <div className="filter-container">
                <Filter />
              </div>
              <div className="cards-container">
                { searchResults.map(({ strMeal, strMealThumb, idMeal }, index) => (
                  <section key={ index }>
                    <Meals
                      strMeal={ strMeal }
                      strMealThumb={ strMealThumb }
                      dataTestIdCard={ `${index}-recipe-card` }
                      dataTestIdImg={ `${index}-card-img` }
                      dataTestIdName={ `${index}-card-name` }
                      idMeal={ idMeal }
                    />
                  </section>
                ))}
              </div>
              <Footer />
            </section>
          )
          : (
            <section>
              <Header />
              <div className="filter-container">
                <Filter />
              </div>
              <div className="cards-container">
                { searchResults.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
                  <section key={ index }>
                    <Drinks
                      strDrink={ strDrink }
                      strDrinkThumb={ strDrinkThumb }
                      dataTestIdCard={ `${index}-recipe-card` }
                      dataTestIdImg={ `${index}-card-img` }
                      dataTestIdName={ `${index}-card-name` }
                      idDrink={ idDrink }
                    />
                  </section>
                ))}
              </div>
              <Footer />
            </section>
          ) }
      </main>
    );
  }
  return (
    <main>
      { (pathname === MEALS_LINK)
        ? (
          <section>
            <Header />
            <div className="filter-container">
              <Filter />
            </div>
            <div className="cards-container">
              { recipes.map(({ strMeal, strMealThumb, idMeal }, index) => (
                <section key={ index }>
                  <Meals
                    strMeal={ strMeal }
                    strMealThumb={ strMealThumb }
                    dataTestIdCard={ `${index}-recipe-card` }
                    dataTestIdImg={ `${index}-card-img` }
                    dataTestIdName={ `${index}-card-name` }
                    idMeal={ idMeal }
                  />
                </section>
              ))}

            </div>
            <Footer />
          </section>
        )
        : (
          <section>
            <Header />
            <div className="filter-container">
              <Filter />
            </div>
            <div className="cards-container">
              { recipes.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
                <section key={ index }>
                  <Drinks
                    strDrink={ strDrink }
                    strDrinkThumb={ strDrinkThumb }
                    dataTestIdCard={ `${index}-recipe-card` }
                    dataTestIdImg={ `${index}-card-img` }
                    dataTestIdName={ `${index}-card-name` }
                    idDrink={ idDrink }
                  />
                </section>
              ))}
            </div>
            <Footer />
          </section>
        ) }
    </main>
  );
}

export default Recipes;
