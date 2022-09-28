import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import capitalizeWords from '../../helpers/capitalizeWords';
import SearchBar from '../SearchBar/SearchBar';

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
        <h1> Recipes app</h1>
        { pageName === 'Profile'
          || pageName === 'Favorite Recipes'
          || pageName === 'Done Recipes' ? (
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="Profile Icon"
              className="purple-filter"
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
      <div className="header-bottom">
        <h1 data-testid="page-title">{ pageName }</h1>
        { showSearch
          && <SearchBar />}
        {/* <iframe
          title="Test"
          width="420"
          height="315"
          src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1"
        /> */}
      </div>
    </div>
  );
}

export default Header;
