import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from '../components/Header/Header';
import { getFromLocalStorage } from '../helpers/localStorage';
import { USER_KEY_LS, DONE_RECIPES, FAVORITE_RECIPES } from '../helpers/constants';

// import PropTypes from 'prop-types';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { email } = getFromLocalStorage(USER_KEY_LS) || {};
    setUserEmail(email);
  }, []);

  const logoutButtonHandler = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{ userEmail }</h3>
      <Link to={ DONE_RECIPES }>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to={ FAVORITE_RECIPES }>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      {/* <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutButtonHandler }
        >
          Logout
        </button>
      </Link> */}
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutButtonHandler }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

// Profile.propTypes = {};

export default Profile;
