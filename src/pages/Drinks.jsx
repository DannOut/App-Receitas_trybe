import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

function Drinks({ strDrink }) {
  return (
    <section>
      <div>{ strDrink }</div>
      <Footer />
    </section>
  );
}

// Drinks.defaultProps = {
//   strDrink: '',
// };
Drinks.propTypes = {
  strDrink: PropTypes.string.isRequired,
};

export default Drinks;
