import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
  const { location: { pathname } } = useHistory();
  const {
    searchTerm,
    selectedFilter,
    setSearchTerm,
    setSelectedFilter,
    getSearchResults,
  } = useContext(SearchContext);

  const searchHandler = async () => {
    if (pathname === MEALS_LINK) {
      switch (selectedFilter) {
      case 'ingredient': {
        getSearchResults(`${MEALS_URL_BASE}/${MEALS_URL_ING_ENDPOINT}${searchTerm}`);
        break;
      }
      case 'name': {
        getSearchResults(`${MEALS_URL_BASE}/${MEALS_URL_DEFAULT_ENDPOINT}${searchTerm}`);
        break;
      }
      case 'first-letter': {
        if (searchTerm.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          getSearchResults(`${MEALS_URL_BASE}/${MEALS_URL_FL_ENDPOINT}${searchTerm}`);
        }
        break;
      }
      default:
        break;
      }
    }
    if (pathname === DRINKS_LINK) {
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
      case 'first-letter': {
        if (searchTerm.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          getSearchResults(`${DRINKS_URL_BASE}/${DRINKS_URL_FL_ENDPOINT}${searchTerm}`);
        }
        break;
      }
      default:
        break;
      }
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        id="search-input"
        data-testid="search-input"
        name="searchInput"
        placeholder="Search..."
        value={ searchTerm }
        onChange={ (e) => (setSearchTerm(e.target.value)) }
      />
      <div className="radio-container">
        <div className="selector">
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              data-testid="ingredient-search-radio"
              name="filter-select"
              value="ingredient"
              onChange={ (e) => (setSelectedFilter(e.target.value)) }
            />
            Ingredient
          </label>
        </div>
        <div className="selector">
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              data-testid="name-search-radio"
              name="filter-select"
              value="name"
              onChange={ (e) => (setSelectedFilter(e.target.value)) }
            />
            Name
          </label>
        </div>
        <div className="selector">
          <label htmlFor="first-letter">
            <input
              type="radio"
              id="first-letter"
              data-testid="first-letter-search-radio"
              name="filter-select"
              value="first-letter"
              onChange={ (e) => (setSelectedFilter(e.target.value)) }
            />
            First Letter
          </label>
        </div>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchHandler }
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
