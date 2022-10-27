import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
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
      <div className="developers">
        <p>Desenvolvedores:</p>
        <a href="https://www.linkedin.com/in/daniel-outeiro/">
          <FontAwesomeIcon className="icon" icon={ faLinkedin } />
          Daniel Outeiro
        </a>
        <a href="https://www.linkedin.com/in/rodrigo-nunes-da-silva/">
          <FontAwesomeIcon className="icon" icon={ faLinkedin } />
          Rodrigo Nunes da Silva
        </a>
        <a href="https://www.linkedin.com/in/bruno-paredes-veiga/">
          <FontAwesomeIcon className="icon" icon={ faLinkedin } />
          Bruno Veiga
        </a>
        <a href="https://www.linkedin.com">
          <FontAwesomeIcon className="icon" icon={ faLinkedin } />
          Juan Pablo
        </a>
        <a href="https://www.linkedin.com">
          <FontAwesomeIcon className="icon" icon={ faLinkedin } />
          Pedro Cbs
        </a>

      </div>
      <Footer />
    </div>
  );
}

// Profile.propTypes = {};

export default Profile;
