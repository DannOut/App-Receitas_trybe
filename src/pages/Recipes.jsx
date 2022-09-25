import React from 'react';
import { useHistory } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';
import { MEALS_LINK } from '../helpers/constants';
// import PropTypes from 'prop-types';

function Recipes() {
  const { location: { pathname } } = useHistory();

  return (
    <main>
      { (pathname === MEALS_LINK) ? <Meals /> : <Drinks /> }
    </main>
  );
}

// Drinks.propTypes = {};

export default Recipes;
