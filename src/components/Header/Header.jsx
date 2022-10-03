import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import searchIcon from '../../images/searchIcon.png';
import plateIcon from '../../images/plate.png';
import profileIcon from '../../images/profileIcon.png';
import capitalizeWords from '../../helpers/capitalizeWords';
import SearchBar from '../SearchBar/SearchBar';
import headerLogo from '../../images/header-logo.png';
import Filter from '../Filter-compoments/Filter.component';

function Header() {
  const [pageName, setPageName] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();

  // TODO: verificar esse useEffect

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { location: { pathname } } = history;
    setPageName(capitalizeWords(pathname));
  });

  // TODO: refatorar a verificação do nome da página atual feita abaixo
  return (
    <div className="header-container">
      <div className="header-top">
        <div className="logo-container">
          <img
            src={ headerLogo }
            alt="logo"
            className="header-logo"
          />
        </div>
        { pageName === 'Profile'
          || pageName === 'Favorite Recipes'
          || pageName === 'Done Recipes' ? (
            <input
              type="image"
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="Profile Icon"
              className="purple-filter"
              onClick={ () => history.push('/profile') }

            />
          ) : (
            <>
              <input
                type="image"
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="Search Icon"
                className="purple-filter"
                onClick={ () => setShowSearch((prevState) => !prevState) }
              />
              <Link to="/profile">
                <img
                  src={ profileIcon }
                  data-testid="profile-top-btn"
                  alt="Profile Icon"
                  className="purple-filter"
                />
              </Link>
            </>
          )}

      </div>
      <div className="header-bottom" data-testid="header-bottom">
        <div className="filter-container">
          <Filter />
        </div>
        <div className="title-container">
          <img
            src={ plateIcon }
            alt="Plate Icon"
          />
          <h3 data-testid="page-title">{ pageName }</h3>
        </div>
        { showSearch
            && <SearchBar />}
      </div>
    </div>
  );
}

export default Header;
