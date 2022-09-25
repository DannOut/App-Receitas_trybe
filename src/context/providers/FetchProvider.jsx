import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../FetchContext';

function FetchProvider({ children }) {
  const [fetchInfos, setFetchInfos] = useState({});
  console.log(fetchInfos, setFetchInfos);

  useEffect(() => {

  });

  return (
    <FetchContext.Provider value={ { teste: 'teste' } }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FetchProvider;
