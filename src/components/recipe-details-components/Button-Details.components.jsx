import React from 'react';
import PropTypes from 'prop-types';

function ButtonDetails({ inProgress }) {
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="recipe_details__startbtn"
    >
      {inProgress ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

ButtonDetails.propTypes = {
  inProgress: PropTypes.bool.isRequired,
};

export default ButtonDetails;
