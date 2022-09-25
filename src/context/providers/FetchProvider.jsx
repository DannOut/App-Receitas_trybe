import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FetchContext from '../FetchContext';
import { fetchAPI } from '../../services';
import { DRINKS_LINK, MEALS_LINK } from '../../helpers/constants';
import {
  URL_DRINK_WITHOUT_ENDPOINT,
  URL_MEALS_WITHOUT_ENDPOINT,
} from '../../services/URLs_constants';

function FetchProvider({ children }) {
  const { location: { pathname } } = useHistory();
  const [fetchMeals, setFetchMeals] = useState([]);
  const [fetchDrinks, setFetchDrinks] = useState([]);

  const getApiInfo = async (api) => {
    const response = await fetchAPI(api);
    const value = await Object.values(response)[0];
    return value;
  };

  useEffect(() => {
    if (pathname === MEALS_LINK) {
      setFetchMeals(getApiInfo(URL_MEALS_WITHOUT_ENDPOINT));
      console.log(fetchMeals);
    }
    if (pathname === DRINKS_LINK) {
      setFetchDrinks(getApiInfo(URL_DRINK_WITHOUT_ENDPOINT));
      console.log(fetchDrinks);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const context = {
    fetchMeals,
    fetchDrinks,
    setFetchMeals,
    setFetchDrinks,
  };

  return (
    <FetchContext.Provider value={ context }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FetchProvider;
