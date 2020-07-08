import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getAuthContext } from '../roles-based-auth/context';

export const SecuredRoute: React.FC<{ component: React.FC; path: string }> = ({ component, path }) => {
  const authContext = useContext(getAuthContext());
  const Component = component;
  return (
    <Route
      path={path}
      render={() => {
        if (!authContext.authenticated) return <Redirect to={authContext.routes.public} />;
        return <Component />;
      }}
    />
  );
};
