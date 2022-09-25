import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

function Meals({ strMeal }) {
  return (
    <section>
      <div>{ strMeal }</div>
      <Footer />
    </section>
  );
}

Meals.propTypes = {
  strMeal: PropTypes.string.isRequired,
};

export default Meals;
