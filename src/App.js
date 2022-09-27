import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './context/providers/LoginProvider';
import FetchProvider from './context/providers/FetchProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import {
  MEALS_LINK,
  DRINKS_LINK,
  MAIN_LOGIN_PAGE,
  PROFILE_LINK,
  RCP_DETAILS_MEALS_LINK,
  RCP_DETAILS_DRINKS_LINK,
  FAVORITE_RECIPES,
  DONE_RECIPES,
  RCP_IN_PROGRESS_MEALS,
  RCP_IN_PROGRESS_DRINKS,

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
            <Route exact path={ RCP_DETAILS_MEALS_LINK } component={ RecipeDetails } />
            <Route exact path={ RCP_DETAILS_DRINKS_LINK } component={ RecipeDetails } />
            <Route exact path={ RCP_IN_PROGRESS_MEALS } component={ RecipeInProgress } />
            <Route exact path={ RCP_IN_PROGRESS_DRINKS } component={ RecipeInProgress } />
            <Route exact path={ FAVORITE_RECIPES } component={ FavoriteRecipes } />
            <Route exact path={ DONE_RECIPES } component={ DoneRecipes } />
          </Switch>
        </FetchProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
