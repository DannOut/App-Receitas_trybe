import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './context/providers/LoginProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
        </Switch>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
