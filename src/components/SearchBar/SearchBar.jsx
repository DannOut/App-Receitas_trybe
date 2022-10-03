/* eslint-disable react-func/max-lines-per-function */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SearchContext from '../../context/SearchContext';
import './SearchBar.css';
import {
  MEALS_URL_BASE,
  MEALS_URL_DEFAULT_ENDPOINT,
  MEALS_URL_ING_ENDPOINT,
  MEALS_URL_FL_ENDPOINT,
  MEALS_LINK,
  DRINKS_LINK,
  DRINKS_URL_BASE,
  DRINKS_URL_DEFAULT_ENDPOINT,
  DRINKS_URL_ING_ENDPOINT,
  DRINKS_URL_FL_ENDPOINT,
} from '../../helpers/constants';

function SearchBar() {
  const history = useHistory();
  const {
    searchTerm,
    selectedFilter,
    setSearchTerm,
    setSelectedFilter,
    searchResults,
    setSearchresults,
    getSearchResults,
  } = useContext(SearchContext);

  useEffect(() => {
    const redirectHandler = () => {
      // * QUANDO SÒ VOLTA 1 RESULTADO SOU ENCAMINHADO DIRETO PARA PAGINA
      if (history.location.pathname === MEALS_LINK && searchResults.length === 1) {
        const { idMeal } = searchResults[0];
        history.push(`/meals/${idMeal}`);
        setSearchresults([]);
      } else if (history.location.pathname === DRINKS_LINK
        && searchResults.length === 1) {
        const { idDrink } = searchResults[0];
        history.push(`/drinks/${idDrink}`);
        setSearchresults([]);
      }
    };
    redirectHandler();
  }, [searchResults]);

  const searchHandler = () => {
    if (history.location.pathname === MEALS_LINK) {
      switch (selectedFilter) {
      case 'ingredient': {
        getSearchResults(
          `${MEALS_URL_BASE}/${MEALS_URL_ING_ENDPOINT}${searchTerm}`,
        );
        break;
      }
      case 'name': {
        getSearchResults(
          `${MEALS_URL_BASE}/${MEALS_URL_DEFAULT_ENDPOINT}${searchTerm}`,
        );
        break;
      }
      default:
        if (searchTerm.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          getSearchResults(`${MEALS_URL_BASE}/${MEALS_URL_FL_ENDPOINT}${searchTerm}`);
        }
        break;
      }
    } else {
      switch (selectedFilter) {
      case 'ingredient': {
        getSearchResults(`${DRINKS_URL_BASE}/${DRINKS_URL_ING_ENDPOINT}${searchTerm}`);
        break;
      }
      case 'name': {
        getSearchResults(
          `${DRINKS_URL_BASE}/${DRINKS_URL_DEFAULT_ENDPOINT}${searchTerm}`,
        );
        break;
      }
      default:
        if (searchTerm.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          getSearchResults(`${DRINKS_URL_BASE}/${DRINKS_URL_FL_ENDPOINT}${searchTerm}`);
        }
        break;
      }
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        id="search-input"
        data-testid="search-input"
        name="searchInput"
        placeholder="Search..."
        value={ searchTerm }
        onChange={ (e) => (setSearchTerm(e.target.value)) }
      />
      <div className="radio-container">
        <div className="form-check form-check-inline">
          <label htmlFor="ingredient" className="form-check-label">
            <input
              type="radio"
              id="ingredient"
              className="form-check-input"
              name="filter-select"
              value="ingredient"
              onChange={ (e) => (setSelectedFilter(e.target.value)) }
            />
            Ingredient
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label htmlFor="name" className="form-check-label">
            <input
              type="radio"
              id="name"
              className="form-check-input"
              data-testid="name-search-radio"
              name="filter-select"
              value="name"
              onChange={ (e) => (setSelectedFilter(e.target.value)) }
            />
            Name
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label htmlFor="first-letter" className="form-check-label">
            <input
              type="radio"
              id="first-letter"
              className="form-check-input"
              data-testid="first-letter-search-radio"
              name="filter-select"
              value="first-letter"
              onChange={ (e) => (setSelectedFilter(e.target.value)) }
            />
            First Letter
          </label>
        </div>
      </div>
      {/* <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchHandler }
      >
        SEARCH
      </button> */}
      <Button
        variant="primary"
        data-testid="exec-search-btn"
        onClick={ searchHandler }
      >
        SEARCH
      </Button>
    </div>
  );
}

export default SearchBar;
