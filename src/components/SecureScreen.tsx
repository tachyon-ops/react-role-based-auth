import React from 'react';

import { RBAuthRedirect } from '../types';
import { AuthContext } from '../roles-based-auth/context';

export const SecureScreen: React.FC<{
  Redirect: RBAuthRedirect;
  Allowed: React.FC;
  NotAllowed?: React.FC;
}> = ({ Redirect, Allowed, NotAllowed }) => (
  <AuthContext.Consumer>
    {(auth) => {
      if (!auth.isAuth) {
        if (NotAllowed) return <NotAllowed />;
        // TODO: set 'last route' in auth context if app needs to gracefully recover
        return <Redirect to={auth.routes?.public || '/'} />;
      }
      return <Allowed />;
    }}
  </AuthContext.Consumer>
);
