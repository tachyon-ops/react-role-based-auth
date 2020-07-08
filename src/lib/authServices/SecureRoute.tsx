import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../roles-based-auth/context';

interface Props {
  path: string;
  Allowed: React.FC;
  NotAllowed?: React.FC;
}
export const SecuredRoute: React.FC<Props> = ({ path, Allowed, NotAllowed }) => {
  return (
    <AuthContext.Consumer>
      {(authContext) => (
        <Route
          path={path}
          render={() => {
            if (!authContext.authenticated) {
              if (NotAllowed) return <NotAllowed />;
              return <Redirect to={authContext.routes.public} />;
            }
            return <Allowed />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};
