import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';
import Header from '../components/Header/Header';
import profileIcon from '../images/profile.png';
import { getFromLocalStorage } from '../helpers/localStorage';
import { USER_KEY_LS, DONE_RECIPES, FAVORITE_RECIPES } from '../helpers/constants';
import '../styles/Profile.css';

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
      <div className="profile-top">
        <img src={ profileIcon } alt="Profile Icon" />
        <h4 data-testid="profile-email" className="display-6">{ userEmail }</h4>
      </div>
      <div className="profile-container mt-5">
        <div className="d-grid gap-4 buttons-container">
          <Link to={ DONE_RECIPES }>
            <Button
              variant="success"
              style={ { width: '100%' } }
            >
              Done Recipes
            </Button>
          </Link>

          <Link to={ FAVORITE_RECIPES }>
            <Button
              variant="warning"
              style={ { width: '100%' } }
            >
              Favorite Recipes
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={ logoutButtonHandler }
          >
            Logout
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Profile.propTypes = {};

export default Profile;
