import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../styles/Recipes.css';

function Drinks({
  strDrink,
  strDrinkThumb,
  dataTestIdCard,
  dataTestIdImg,
  dataTestIdName,
  idDrink,
}) {
  const history = useHistory();

  const detailsDrinkRedirectHandler = async () => {
    history.push(`/drinks/${idDrink}`);
  };

  return (
    <div
      data-testid={ dataTestIdCard }
      role="presentation"
      onClick={ detailsDrinkRedirectHandler }
      id={ idDrink }
    >
      <Card className="card">
        <Card.Img data-testid={ dataTestIdImg } variant="top" src={ strDrinkThumb } />
        <Card.ImgOverlay className="image-overlay">
          <Card.Title data-testid={ dataTestIdName }>{strDrink}</Card.Title>
        </Card.ImgOverlay>
      </Card>
      {/* <p data-testid={ dataTestIdName }>
        {strDrink}
      </p>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid={ dataTestIdImg }
      /> */}
    </div>
  );
}

Drinks.defaultProps = {
  strDrink: '',
  strDrinkThumb: '',
  dataTestIdCard: '',
  dataTestIdImg: '',
  dataTestIdName: '',
  idDrink: '',
};

Drinks.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  dataTestIdCard: PropTypes.string,
  dataTestIdImg: PropTypes.string,
  dataTestIdName: PropTypes.string,
  idDrink: PropTypes.string,

};

export default Drinks;
