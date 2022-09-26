import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './context/providers/LoginProvider';
import FetchProvider from './context/providers/FetchProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import {
  MEALS_LINK,
  DRINKS_LINK,
  MAIN_LOGIN_PAGE,
  PROFILE_LINK,
} from './helpers/constants';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <FetchProvider>
          <Switch>
            <Route exact path={ MAIN_LOGIN_PAGE } component={ Login } />
            <Route exact path={ MEALS_LINK } component={ Recipes } />
            <Route exact path={ DRINKS_LINK } component={ Recipes } />
            <Route exact path={ PROFILE_LINK } component={ Profile } />
          </Switch>
        </FetchProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
