/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useHistory, useParams, Link } from 'react-router-dom';
import { getFromLocalStorage, saveLocalStorage } from '../../helpers/localStorage';
import shareIcon from '../../images/shareIcon.png';
import blackHeart from '../../images/blackHeart.png';
import whiteHeart from '../../images/whiteHeart.png';

const copy = require('clipboard-copy');

function CardInProgress({
  strCategory, ingredientsAndRecipes, idMeal, strInstructions, strMeal, strMealThumb,
  idDrink, strDrink, strDrinkThumb, strYoutube, strAlcoholic, strArea, strTags,
}) {
  const { location: { pathname } } = useHistory();
  const { id: idUrl } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const { ingredients, measures } = ingredientsAndRecipes;
  const isMeal = pathname.includes('meals');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [checked, setChecked] = useState({
    [idUrl]: {},
  });
  const [finish, setFinish] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [likeToast, setShowLikeToast] = useState(false);

  useEffect(() => {
    const startLSFavorites = getFromLocalStorage('favoriteRecipes') || [];
    setFavoriteRecipes(startLSFavorites);
    const checkLSfavorites = startLSFavorites.some(({ id }) => id === idUrl);
    setIsFavorited(checkLSfavorites);
    const getChecksInLocalStorage = () => {
      const localS = localStorage.getItem('inProgressRecipes');
      const json = JSON.parse(localS);
      setChecked((prevState) => ({
        ...prevState,
        ...json,
      }));
    };
    getChecksInLocalStorage();
  }, []);
  useEffect(() => {
    const handleFinishButton = () => {
      const checkboxes = Object.values(checked[idUrl]).every((i) => i);
      const checksLength = Object.keys(checked[idUrl]).length === ingredients.length;
      if (checkboxes && checksLength) {
        setFinish(false);
      } else {
        setFinish(true);
      }
    };
    handleFinishButton();
    saveLocalStorage('inProgressRecipes', checked);
  }, [checked]);
  const handleCheckbox = ({ target }) => {
    const { id } = target;
    setChecked((prevState) => ({
      ...prevState,
      [idUrl]: {
        ...prevState[idUrl],
        [id]: !checked[idUrl][id],
      },
    }));
  };
  const renderMeasures = () => ingredients.map((val, index) => (
    <li key={ index }>
      <label
        htmlFor={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          id={ index }
          checked={ checked[idUrl][index] }
          onClick={ handleCheckbox }
          onChange={ (e) => e }
        />
        {
          checked[idUrl][index]
            ? <s>{` ${val} ${measures[index]}`}</s> : ` ${val} ${measures[index]}`
        }
      </label>
    </li>
  ));
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
  const copyToClipBoard = () => {
    copy(`http://localhost:3000${pathname}`);
    setShowToast(true);
  };
  const saveDoneHandler = () => {
    const doneRecipes = getFromLocalStorage('doneRecipes') || [];
    const addRecipe = {
      id: isMeal ? idMeal : idDrink,
      type: isMeal ? 'meal' : 'drink',
      nationality: isMeal ? strArea : '',
      category: strCategory,
      alcoholicOrNot: isMeal ? '' : strAlcoholic,
      name: isMeal ? strMeal : strDrink,
      image: isMeal ? strMealThumb : strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: strTags?.split(','),
    };
    return [...doneRecipes, addRecipe];
  };
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
            <Card.Title className="display-6">Recipe in Progress</Card.Title>
            <Card.Title
              data-testid="recipe-title"
            >
              {isMeal ? strMeal : strDrink }
            </Card.Title>
            <Badge
              bg="primary"
            >
              {isMeal ? strCategory : `${strCategory} | ${strAlcoholic}` }
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
            <strong className="me-auto"> </strong>
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
          <Card.Title className="mb-3 text-muted">Ingredients</Card.Title>
          <Card.Text data-testid="instructions" className="mb-2 text-muted">
            <ul className="list-unstyled">
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
      <Link to="/done-recipes">
        <Button
          variant={ !finish ? 'success' : 'secondary' }
          disabled={ finish }
          className="recipe_details__startbtn"
          data-testid="finish-recipe-btn"
          onClick={ () => { saveLocalStorage('doneRecipes', saveDoneHandler()); } }
        >
          Finish Recipe
        </Button>
      </Link>
    </section>
  );
}
CardInProgress.defaultProps = {
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
  strTags: '',
};

CardInProgress.propTypes = {
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
  strTags: PropTypes.string,
  ingredientsAndRecipes: PropTypes.shape().isRequired,
};
export default CardInProgress;
