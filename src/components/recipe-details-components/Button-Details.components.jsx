import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function ButtonDetails({ inProgress, redirectPage }) {
  const history = useHistory();
  return (
    <div>
      <Button
        variant="primary"
        size="lg"
        className="recipe_details__startbtn"
        onClick={ () => history.push(redirectPage) }
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </Button>
    </div>
  );
}

ButtonDetails.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  redirectPage: PropTypes.string.isRequired,
};

export default ButtonDetails;
