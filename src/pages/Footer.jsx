import React from 'react';
import ImgFooter from '../components/footer-components/Img-Footer.component';
import mealLogo from '../images/mealIcon.svg';
import drinkLogo from '../images/drinkIcon.svg';
import '../styles/Footer.css';
// import PropTypes from 'prop-types';

function Footer() {
  return (
    <footer className="footer_page" data-testid="footer">
      <ImgFooter
        linkTo="/meals"
        srcImg={ mealLogo }
        altImg="MealIcon"
        dataTestId="meals-bottom-btn"
      />
      <ImgFooter
        linkTo="/drinks"
        srcImg={ drinkLogo }
        altImg="DrinkIcon"
        dataTestId="drinks-bottom-btn"
      />
    </footer>
  );
}

// Footer.propTypes = {};

export default Footer;
