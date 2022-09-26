import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FetchContext from '../context/FetchContext';

function Meals({
  strMeal,
  strMealThumb,
  dataTestIdCard,
  dataTestIdImg,
  dataTestIdName,
  idMeal,

}) {
  const history = useHistory();
  const {
    getRecipeDetails,
  } = useContext(FetchContext);

  const detailsMealRedirectHandler = () => {
    getRecipeDetails(idMeal);
    history.push(`/meals/${idMeal}`);
  };

  return (
    <section
      data-testid={ dataTestIdCard }
      role="presentation"
      onClick={ detailsMealRedirectHandler }
      id={ idMeal }
    >
      <p data-testid={ dataTestIdName }>
        { strMeal }
      </p>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid={ dataTestIdImg }
      />
    </section>
  );
}

Meals.defaultProps = {
  strMeal: '',
  strMealThumb: '',
  dataTestIdCard: '',
  dataTestIdImg: '',
  dataTestIdName: '',
  idMeal: '',
};

Meals.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  dataTestIdCard: PropTypes.string,
  dataTestIdImg: PropTypes.string,
  dataTestIdName: PropTypes.string,
  idMeal: PropTypes.string,
};

export default Meals;
