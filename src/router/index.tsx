// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import AfterLogin from '../pages/AfterLogin';
import PrivateRoute from './PrivateRoute';
import Main from '../pages/main';
import Setting from '../pages/Setting';
import NotFound from '../pages/NotFound';

const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/after-login" component={AfterLogin} />
        <PrivateRoute exact path="/" component={Main} />
        <PrivateRoute exact path="/setting" component={Setting} />
        <Route path="/error" component={NotFound} />
        <Redirect path="*" to="/" /> *
      </Switch>
    </Router>
  );
};

export default AppRouter;
