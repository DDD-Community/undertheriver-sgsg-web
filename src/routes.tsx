import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Main } from './containers/index';

const history = createMemoryHistory();

const Root: React.FC = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
  </Router>
);

export default Root;
