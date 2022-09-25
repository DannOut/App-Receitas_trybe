import React from 'react';
import PropTypes from 'prop-types';

function Drinks({
  strDrink,
  strDrinkThumb,
  dataTestIdCard,
  dataTestIdImg,
  dataTestIdName,
}) {
  return (
    <section data-testid={ dataTestIdCard }>
      <p data-testid={ dataTestIdName }>
        { strDrink }
      </p>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid={ dataTestIdImg }
      />
    </section>
  );
}

Drinks.defaultProps = {
  strDrink: '',
  strDrinkThumb: '',
  dataTestIdCard: '',
  dataTestIdImg: '',
  dataTestIdName: '',
};

Drinks.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  dataTestIdCard: PropTypes.string,
  dataTestIdImg: PropTypes.string,
  dataTestIdName: PropTypes.string,

};

export default Drinks;
