// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Main from './pages/main';
import PrivateRoute from './pages/PrivateRoute';
import Login from './pages/Login';
import AfterLogin from './pages/AfterLogin';
import Setting from './pages/Setting';
import NotFound from './pages/NotFound';

const history = createMemoryHistory();

const Root: React.FC = () => (
  <ChakraProvider resetCSS>
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
  </ChakraProvider>
);

export default Root;
