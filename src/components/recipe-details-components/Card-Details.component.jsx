/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
// import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useHistory, useParams } from 'react-router-dom';
import { getFromLocalStorage, saveLocalStorage } from '../../helpers/localStorage';
import Recomendation from '../Recomendations-Componentes/Recomendation';
import ButtonDetails from './Button-Details.components';
import { recipeIsDone } from '../../helpers';
import './recipe-details.css';
import shareIcon from '../../images/shareIcon.png';
import blackHeart from '../../images/blackHeart.png';
import whiteHeart from '../../images/whiteHeart.png';

const copy = require('clipboard-copy');

function CardDetails({
  strCategory,
  ingredientsAndRecipes,
  idMeal,
  strInstructions,
  strMeal,
  strMealThumb,
  idDrink,
  strDrink,
  strDrinkThumb,
  strYoutube,
  strAlcoholic,
  strArea,
}) {
  const { location: { pathname } } = useHistory();
  const { id: idUrl } = useParams();
  // const [isCopied, setIsCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { ingredients, measures } = ingredientsAndRecipes;
  const isMeal = pathname.includes('meals');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [likeToast, setShowLikeToast] = useState(false);
  useEffect(() => {
    const startLSFavorites = getFromLocalStorage('favoriteRecipes') || [];
    setFavoriteRecipes(startLSFavorites);
    const checkLSfavorites = startLSFavorites.some(({ id }) => id === idUrl);
    setIsFavorited(checkLSfavorites);
  }, []);
  const renderMeasures = () => ingredients.map((val, index) => (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${val} ${measures[index]}`}
    </li>
  ));
  const inProgressRecipe = () => {
    const data = getFromLocalStorage('inProgressRecipes') || {};
    const typeOfFood = isMeal ? data.meals : data.drinks;
    if (typeOfFood) {
      const isInProgress = Object.keys(typeOfFood)
        .some((inProgressId) => inProgressId === idUrl);
      return isInProgress;
    }
    return false;
  };
  const saveFavoriteHandler = () => {
    const addRecipe = {
      id: isMeal ? idMeal : idDrink,
      type: isMeal ? 'meal' : 'drink',
      nationality: isMeal ? strArea : '',
      category: strCategory,
      alcoholicOrNot: isMeal ? '' : strAlcoholic,
      name: isMeal ? strMeal : strDrink,
      image: isMeal ? strMealThumb : strDrinkThumb,
    };
    return [...favoriteRecipes, addRecipe];
  };
  const removeFavoriteSelected = () => {
    const localStorageChecker = getFromLocalStorage('favoriteRecipes');
    const updatedFavoriteRecipes = localStorageChecker
      .filter(({ id }) => id !== idUrl);
    return updatedFavoriteRecipes;
  };
  const removeIconFavorite = () => {
    saveLocalStorage('favoriteRecipes', removeFavoriteSelected());
    setIsFavorited(false);
  };
  const saveAndFavoriteRecipe = () => {
    saveLocalStorage('favoriteRecipes', saveFavoriteHandler());
    setIsFavorited(true);
  };
  const handleFavorite = () => {
    if (isFavorited) return removeIconFavorite();
    saveAndFavoriteRecipe();
    setShowLikeToast(true);
  };
  const redirectPageFunc = () => {
    if (isMeal) return `/meals/${idUrl}/in-progress`;
    return `/drinks/${idUrl}/in-progress`;
  };
  const copyToClipBoard = () => {
    copy(`http://localhost:3000${pathname}`);
    // setIsCopied(true);
    setShowToast(true);
  };
  const isDone = recipeIsDone('doneRecipes', idUrl);
  const inProgress = inProgressRecipe();
  const redirectPage = redirectPageFunc();
  return (
    <section>
      <Card className="card-banner">
        <Card.Img
          className="rounded-0"
          data-testid="recipe-photo"
          src={ isMeal ? strMealThumb : strDrinkThumb }
        />
        <Card.ImgOverlay className="image-overlay-details details-banner rounded-0">
          <Card.Body>
            <Card.Title
              className="display-4"
              data-testid="recipe-title"
            >
              {isMeal ? strMeal : strDrink }
            </Card.Title>
            <Badge
              bg="primary"
            >
              {isMeal ? strCategory : `${strCategory} ${strAlcoholic}` }
            </Badge>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>

      <div className="text-muted card-footer">
        <input
          type="image"
          data-testid="share-btn"
          onClick={ copyToClipBoard }
          src={ shareIcon }
          alt="share icon"
        />
        <input
          type="image"
          data-testid="favorite-btn"
          onClick={ handleFavorite }
          src={ isFavorited ? blackHeart : whiteHeart }
          alt="SHARE"
        />
      </div>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          onClose={ () => setShowToast(false) }
          show={ showToast }
          delay={ 3000 }
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>Link copied to your clipboard!</Toast.Body>
        </Toast>
        <Toast
          onClose={ () => setShowLikeToast(false) }
          show={ likeToast }
          delay={ 3000 }
          autohide
        >
          <Toast.Header>
            <strong className="me-auto"> </strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>Recipe added to the favorites!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Card>
        <Card.Body>
          <Card.Title className="mb-2 text-muted">Ingredients</Card.Title>
          <Card.Text data-testid="instructions" className="mb-2 text-muted">
            <ul>
              { renderMeasures() }
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title className="mb-2 text-muted">Instructions</Card.Title>
          <Card.Text data-testid="instructions" className="mb-2 text-muted">
            { strInstructions }
          </Card.Text>
        </Card.Body>
      </Card>
      { isMeal
        ? (
          <Card className="border-0">
            <Card.Body className="video-card">
              <div>
                <iframe
                  title={ strMeal }
                  src={ strYoutube?.replace('watch?v=', 'embed/') }
                  width="100%"
                  height="250px"
                  data-testid="video"
                  className="embed-responsive-item"
                />
              </div>
            </Card.Body>
          </Card>
        ) : null}
      <Recomendation />
      {!isDone && <ButtonDetails
        inProgress={ inProgress }
        redirectPage={ redirectPage }
      /> }
    </section>
  );
}
CardDetails.defaultProps = {
  strCategory: '',
  ingredients: '',
  measures: '',
  strInstructions: '',
  strMeal: '',
  strMealThumb: '',
  strDrink: '',
  strDrinkThumb: '',
  strYoutube: '',
  strAlcoholic: '',
  idMeal: '',
  idDrink: '',
  strArea: '',
};
CardDetails.propTypes = {
  idMeal: PropTypes.string,
  idDrink: PropTypes.string,
  strArea: PropTypes.string,
  strCategory: PropTypes.string,
  ingredients: PropTypes.string,
  measures: PropTypes.string,
  strInstructions: PropTypes.string,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strYoutube: PropTypes.string,
  strAlcoholic: PropTypes.string,
  ingredientsAndRecipes: PropTypes.shape().isRequired,
};
export default CardDetails;
