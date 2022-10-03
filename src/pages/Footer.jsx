// import React, { useContext } from 'react';
import React from 'react';
import ImgFooter from '../components/footer-components/Img-Footer.component';
import mealLogo from '../images/mealIcon.svg';
import drinkLogo from '../images/drinkIcon.svg';
import '../styles/Footer.css';
import { MEALS_LINK, DRINKS_LINK,
  TEST_ID_FOOTER_DRINKS,
  TEST_ID_FOOTER_MEALS,
} from '../helpers/constants';
// import FetchContext from '../context/FetchContext';

// import PropTypes from 'prop-types';

function Footer() {
  // const { setFilter } = useContext(FetchContext);
  return (
    <footer className="footer_page fixed-bottom" data-testid="footer">
      <ImgFooter
        linkTo={ MEALS_LINK }
        srcImg={ mealLogo }
        altImg={ mealLogo }
        dataTestId={ TEST_ID_FOOTER_MEALS }
        // onClick={ () => setFilter([]) }
      />
      <ImgFooter
        linkTo={ DRINKS_LINK }
        srcImg={ drinkLogo }
        altImg={ drinkLogo }
        dataTestId={ TEST_ID_FOOTER_DRINKS }
        // onClick={ () => setFilter([]) }
      />
    </footer>
  );
}

// Footer.propTypes = {};

export default Footer;
