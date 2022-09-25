import React from 'react';
import Meals from './Meals';
import Drinks from './Drinks';
// import PropTypes from 'prop-types';

function Recipes() {
  return (
    <main>
      { (Meals) ? <Meals /> : <Drinks /> }
    </main>
  );
}

// Drinks.propTypes = {};

export default Recipes;
