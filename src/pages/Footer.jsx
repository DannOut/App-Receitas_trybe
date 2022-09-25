import React from 'react';
import ImgFooter from '../components/footer-components/Img-Footer.component';
import mealLogo from '../images/mealIcon.svg';
import drinkLogo from '../images/drinkIcon.svg';
import '../styles/Footer.css';
import { MEALS_LINK, DRINKS_LINK } from '../helpers/constants';
// import PropTypes from 'prop-types';

function Footer() {
  return (
    <footer className="footer_page" data-testid="footer">
      <ImgFooter
        linkTo={ MEALS_LINK }
        srcImg={ mealLogo }
        altImg="MealIcon"
        dataTestId="meals-bottom-btn"
      />
      <ImgFooter
        linkTo={ DRINKS_LINK }
        srcImg={ drinkLogo }
        altImg="DrinkIcon"
        dataTestId="drinks-bottom-btn"
      />
    </footer>
  );
}

// Footer.propTypes = {};

export default Footer;
