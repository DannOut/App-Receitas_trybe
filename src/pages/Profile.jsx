import React from 'react';
import Footer from './Footer';
import Header from '../components/Header/Header';

// import PropTypes from 'prop-types';

function Profile() {
  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">email</h3>
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
