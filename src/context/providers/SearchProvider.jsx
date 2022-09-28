import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchContext from '../SearchContext';
import { fetchAPI } from '../../services';
import { MAX_LIMIT_INFORMATION } from '../../helpers/constants';

function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchResults, setSearchresults] = useState([]);

  const getSearchResults = async (url) => {
    try {
      const response = await fetchAPI(url);
      const value = await Object.values(response)[0].slice(0, MAX_LIMIT_INFORMATION);
      setSearchresults(value);
    } catch (err) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const context = {
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    searchResults,
    setSearchresults,
    getSearchResults,
  };

  return (
    <SearchContext.Provider value={ context }>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
