/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Header from '../components/Header/Header';
import { saveLocalStorage, getFromLocalStorage } from '../helpers/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
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
    setIsCopied(target.id);
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
  };

  return (
    <div>
      <Header />
      <div className="done-filter-container mb-5 mt-3">
        <ButtonGroup>
          <Button
            variant="outline-info"
            value="all"
            onClick={ handleFavorite }
            data-testid="filter-by-all-btn"
          >
            All
          </Button>
          <Button
            variant="outline-info"
            value="meal"
            onClick={ handleFavorite }
            data-testid="filter-by-meal-btn"
          >
            Meals
          </Button>
          <Button
            variant="outline-info"
            value="drink"
            onClick={ handleFavorite }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </Button>
        </ButtonGroup>
      </div>
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
              <Card.Body>
                <Card.Title className="mt-4 text-muted">{ name }</Card.Title>
                <div className="done-card-body">
                  <Badge bg="secondary">
                    {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
                  </Badge>
                </div>
                <div>
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
  );
}
export default FavoriteRecipes;
