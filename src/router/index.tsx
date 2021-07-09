import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import AfterLogin from '../pages/AfterLogin';
import PrivateRoute from '../pages/PrivateRoute';
import Main from '../pages/main';
import Setting from '../pages/Setting';
import NotFound from '../pages/NotFound';
import React from 'react';

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
  <Route exact path="/after-login" component={AfterLogin} />
  <PrivateRoute exact path="/" component={Main} />
  <PrivateRoute exact path="/setting" component={Setting} />
  <Route path="/error" component={NotFound} />
  <Redirect path="*" to="/" /> *
    </Switch>
    </BrowserRouter>
  )
}
