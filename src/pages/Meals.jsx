import React from 'react';
import PropTypes from 'prop-types';

function Meals({
  strMeal,
  strMealThumb,
  dataTestIdCard,
  dataTestIdImg,
  dataTestIdName,

}) {
  return (
    <section data-testid={ dataTestIdCard }>
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
};

Meals.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  dataTestIdCard: PropTypes.string,
  dataTestIdImg: PropTypes.string,
  dataTestIdName: PropTypes.string,

};

export default Meals;
