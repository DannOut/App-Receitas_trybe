import React from 'react';
import ImgFooter from '../components/footer-components/Img-Footer.component';
import mealLogo from '../images/mealIcon.svg';
import drinkLogo from '../images/drinkIcon.svg';
import '../styles/Footer.css';
import { MEALS_LINK, DRINKS_LINK,
  TEST_ID_MEALS_BOTTOM_BTN,
  TEST_ID_DRINKS_BOTTOM_BTN,
} from '../helpers/constants';
// import PropTypes from 'prop-types';

function Footer() {
  return (
    <footer className="footer_page" data-testid="footer">
      <ImgFooter
        linkTo={ MEALS_LINK }
        srcImg={ mealLogo }
        altImg={ mealLogo }
        dataTestId={ TEST_ID_MEALS_BOTTOM_BTN }
      />
      <ImgFooter
        linkTo={ DRINKS_LINK }
        srcImg={ drinkLogo }
        altImg={ drinkLogo }
        dataTestId={ TEST_ID_DRINKS_BOTTOM_BTN }
      />
    </footer>
  );
}

// Footer.propTypes = {};

export default Footer;
