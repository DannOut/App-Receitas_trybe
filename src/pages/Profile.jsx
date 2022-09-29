import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from '../components/Header/Header';
import { getFromLocalStorage } from '../helpers/localStorage';
import { USER_KEY_LS } from '../helpers/constants';

// import PropTypes from 'prop-types';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const { email } = getFromLocalStorage(USER_KEY_LS);
    setUserEmail(email);
  }, []);

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{ userEmail }</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

// Profile.propTypes = {};

export default Profile;
