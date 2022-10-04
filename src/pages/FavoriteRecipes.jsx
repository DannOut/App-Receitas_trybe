/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Header from '../components/Header/Header';
import { saveLocalStorage, getFromLocalStorage } from '../helpers/localStorage';
import shareIcon from '../images/shareIcon.png';
import blackHeartIcon from '../images/blackHeart.png';
import '../styles/FavoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [LikeToast, setShowLikeToast] = useState(false);
  // const { location: { pathname } } = useHistory();

  useEffect(() => {
    const favoriteRecipesFromLocalStorage = getFromLocalStorage('favoriteRecipes') || [];
    setFavoriteRecipes(favoriteRecipesFromLocalStorage);
  }, []);

  if (filter.length < favoriteRecipes.length) {
    setFilter(favoriteRecipes);
  }

  const onClickHandler = ({ target }) => {
    const filtering = target.value;
    const filterFavoriteRecipes = filter
      .filter(({ type }) => filtering === 'all' || type === filtering);
    setFavoriteRecipes(filterFavoriteRecipes);
  };

  const copyToClipBoard = (target) => {
    if (target.name === 'meal') {
      copy(`http://localhost:3000/meals/${target.id}`);
    } else {
      copy(`http://localhost:3000/drinks/${target.id}`);
    }
    setShowToast(true);
  };

  // const saveAndFavoriteRecipe = (target) => {
  //   saveLocalStorage('favoriteRecipes', saveFavoriteHandler(target));
  //   setIsFavorited(true);
  // };

  const handleFavorite = (target) => {
    console.log(target.name);
    const localStorageChecker = getFromLocalStorage('favoriteRecipes');
    const updatedFavoriteRecipes = localStorageChecker
      .filter(({ id }) => id !== target.id);
    saveLocalStorage('favoriteRecipes', updatedFavoriteRecipes);
    setFavoriteRecipes(updatedFavoriteRecipes);
    setShowLikeToast(true);
  };

  return (
    <div>
      <Header />
      <div className="done-filter-container mb-5 mt-3">
        <ButtonGroup>
          <Button
            variant="secondary"
            value="all"
            onClick={ (e) => onClickHandler(e) }
            data-testid="filter-by-all-btn"
          >
            All
          </Button>
          <Button
            variant="secondary"
            value="meal"
            onClick={ (e) => onClickHandler(e) }
            data-testid="filter-by-meal-btn"
          >
            Meals
          </Button>
          <Button
            variant="secondary"
            value="drink"
            onClick={ (e) => onClickHandler(e) }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </Button>
        </ButtonGroup>
      </div>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          onClose={ () => setShowToast(false) }
          show={ showToast }
          delay={ 3000 }
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto"> </strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>Link copied to your clipboard!</Toast.Body>
        </Toast>

        <Toast
          onClose={ () => setShowLikeToast(false) }
          show={ LikeToast }
          delay={ 3000 }
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto"> </strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>Recipe removed from the list!</Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="favorite-cards-container">
        {favoriteRecipes.map((
          {
            image,
            category,
            name,
            nationality,
            alcoholicOrNot,
            type,
            id,
          },
          index,
        ) => (
          <div key={ `${index}` } className="done-recipe-card">
            <Card>
              <div className="done-card">
                <Link to={ `/${type}s/${id}` }>
                  <Card.Img
                    variant="top"
                    src={ image }
                  />
                </Link>
                <Card.Body className="card-main-section">
                  <div className="done-card-header">
                    <Card.Title className="mt-4 text-muted">{ name }</Card.Title>
                    <Badge bg="secondary">
                      {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
                    </Badge>
                  </div>
                  <div className="social-container">
                    <input
                      type="image"
                      alt="favorite"
                      name={ type }
                      id={ id }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      onClick={ ({ target }) => handleFavorite(target) }
                      src={ blackHeartIcon }
                    />
                    <input
                      type="image"
                      src={ shareIcon }
                      name={ type }
                      id={ id }
                      alt="share"
                      onClick={ ({ target }) => copyToClipBoard(target) }
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </div>
                </Card.Body>
              </div>
            </Card>
          </div>
        ))}
      </div>

    </div>
  );
}
export default FavoriteRecipes;
