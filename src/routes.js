import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
