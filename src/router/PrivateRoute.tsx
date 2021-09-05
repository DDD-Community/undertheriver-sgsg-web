// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { FolderListProvider } from '@/contexts/FolderListContext';

function PrivateRoute({ component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('access_token') ? (
          render ? (
            render(props)
          ) : (
            <FolderListProvider orderBy={'MEMO'}>
              <Component {...props} />
            </FolderListProvider>
          )
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
