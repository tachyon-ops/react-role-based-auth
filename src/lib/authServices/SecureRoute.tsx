import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { RBAuthReactContext } from '..';

interface Props {
  AuthContext: RBAuthReactContext;
  path: string;
  Comp: React.FC;
  NotAllowed?: React.FC;
}
export const SecuredRoute: React.FC<Props> = ({ AuthContext, Comp, path, NotAllowed }) => (
  <AuthContext.Consumer>
    {(authContext) => (
      <Route
        path={path}
        render={() => {
          if (!authContext.authenticated) {
            if (NotAllowed) return <NotAllowed />;
            return <Redirect to={authContext.routes.public} />;
          }
          return <Comp />;
        }}
      />
    )}
  </AuthContext.Consumer>
);
