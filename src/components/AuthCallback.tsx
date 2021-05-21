import React from 'react';

import { AuthContext } from '../roles-based-auth/context';
import { RBAuthRedirect } from '../types';

/**
 * TODO: test this component with something like Auth0
 */
interface Props {
  locationHash: string;
  Redirect?: null | RBAuthRedirect;
}
export const AuthCallback: React.FC<Props> = ({ children, locationHash, Redirect }) => (
  <AuthContext.Consumer>
    {(auth) => {
      if (/access_token|id_token|error/.test(locationHash)) {
        auth.logic.handle();
        return <></>;
      }
      if (Redirect) return <Redirect to={auth.routes.public} />;
      else {
        // eslint-disable-next-line no-console
        console.log('AuthCallback has no redirect, be sure handleAuthentication has programatic redirection');
      }
      return <>{children}</>;
    }}
  </AuthContext.Consumer>
);
