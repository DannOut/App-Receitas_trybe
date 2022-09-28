import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonDetails({ inProgress, redirectPage }) {
  const history = useHistory();
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="recipe_details__startbtn"
      onClick={ () => history.push(redirectPage) }
    >
      {inProgress ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

ButtonDetails.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  redirectPage: PropTypes.string.isRequired,
};

export default ButtonDetails;
