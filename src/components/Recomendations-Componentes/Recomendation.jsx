import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Recomendation.css';
import Card from 'react-bootstrap/Card';
import FetchContext from '../../context/FetchContext';

function Recomendation() {
  const { location: { pathname } } = useHistory();
  const { recomendations } = useContext(FetchContext);
  // const history = useHistory();

  // const detailsMealRedirectHandler = async () => {
  //   history.push(`/meals/${idMeal}`);
  // };
  // const detailsDrinkRedirectHandler = async () => {
  //   history.push(`/drinks/${idDrink}`);
  // };

  const creatRecomendations = () => {
    if (pathname.includes('drinks')) {
      const mealsRecomendation = recomendations.map(
        ({ strMeal, strMealThumb, idMeal }, index) => (
          <Card
            key={ index }
            id={ idMeal }
            data-testid={ `${index}-recommendation-card` }
          >
            <Card.Img variant="top" src={ strMealThumb } />
            <Card.ImgOverlay className="image-overlay">
              <Card.Title
                data-testid={ `${index}-recommendation-title` }
              >
                {strMeal}
              </Card.Title>
            </Card.ImgOverlay>
          </Card>
        ),
      );
      return mealsRecomendation;
    }
    const drinksRecomendation = recomendations.map(
      ({ strDrink, strDrinkThumb, idDrink }, index) => (
        <Card
          key={ index }
          id={ idDrink }
          data-testid={ `${index}-recommendation-card` }
        >
          <Card.Img variant="top" src={ strDrinkThumb } />
          <Card.ImgOverlay className="image-overlay">
            <Card.Title
              data-testid={ `${index}-recommendation-title` }
            >
              {strDrink}
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
      ),
    );
    return drinksRecomendation;
  };
  return (

    <Card
      style={ { padding: '5px' } }
      className="border-0"
    >
      <Card.Title
        className="text-muted title-recommendation"
      >
        You may also like:
      </Card.Title>
      <div className="container">
        {creatRecomendations()}
      </div>
    </Card>
  );
}

export default Recomendation;
