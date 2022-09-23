import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loginContext from '../LoginContext';

function LoginProvider({ children }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const context = {
    loginInfo,
    setLoginInfo,
  };

  return (
    <loginContext.Provider value={ context }>
      {children}
    </loginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
