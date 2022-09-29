import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FetchContext from '../../context/FetchContext';

function Recomendation() {
  const { location: { pathname } } = useHistory();
  const { recomendations } = useContext(FetchContext);
  // const history = useHistory();

  // const detailsMealRedirectHandler = async () => {
  //   history.push(`/meals/${idMeal}`);
  // };
  // const detailsDrinkRedirectHandler = async () => {
  //   history.push(`/drinks/${idDrink}`);
  // };

  const creatRecomendations = () => {
    if (pathname.includes('drinks')) {
      const mealsRecomendation = recomendations.map(
        ({ strMeal, strMealThumb, idMeal }, index) => (
          <button
            className="container-item"
            key={ index }
            data-testid={ `${index}-recommendation-card` }
            id={ idMeal }
            type="button"
          >
            <p data-testid={ `${index}-recommendation-title` }>
              {strMeal}
            </p>
            <img
              src={ strMealThumb }
              alt={ strMeal }
            />
          </button>
        ),
      );
      return mealsRecomendation;
    }
    const drinksRecomendation = recomendations.map(
      ({ strDrink, strDrinkThumb, idDrink }, index) => (
        <button
          className="container-item"
          key={ index }
          data-testid={ `${index}-recommendation-card` }
          id={ idDrink }
          type="button"
        >
          <p data-testid={ `${index}-recommendation-title` }>
            {strDrink}
          </p>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
          />
        </button>
      ),
    );
    return drinksRecomendation;
  };
  return (

    <div className="container">
      {creatRecomendations()}
    </div>
  );
}

export default Recomendation;
