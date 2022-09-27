import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        id="search-input"
        placeholder="Search..."
        // onChange={ this.handleChange }
        // value={ inputEmail }
      />
      <div className="radio-container">
        <div className="selector">
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              data-testid="ingredient-search-radio"
              name="ingredient-search"
              value="ingredient"
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
              name="name-search"
              value="name"
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
              name="first-letter-search"
              value="first-letter"
            />
            First Letter
          </label>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
