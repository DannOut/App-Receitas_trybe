import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../styles/Recipes.css';

function Meals({
  strMeal,
  strMealThumb,
  dataTestIdCard,
  dataTestIdImg,
  dataTestIdName,
  idMeal,

}) {
  const history = useHistory();

  const detailsMealRedirectHandler = async () => {
    history.push(`/meals/${idMeal}`);
  };
  return (
    <div
      data-testid={ dataTestIdCard }
      role="presentation"
      onClick={ detailsMealRedirectHandler }
      id={ idMeal }
    >
      <Card className="card">
        <Card.Img data-testid={ dataTestIdImg } variant="top" src={ strMealThumb } />
        <Card.ImgOverlay className="image-overlay">
          <Card.Title data-testid={ dataTestIdName }>{strMeal}</Card.Title>
        </Card.ImgOverlay>
      </Card>
      {/* <div className="card-title">
        <p data-testid={ dataTestIdName }>
          {strMeal}
        </p>
      </div>
      <div className="card-image">
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ dataTestIdImg }
        />

      </div> */}
    </div>

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
