import React from 'react';

import { AuthContext, RBAuthRedirect } from '..';

/**
 * TODO: test this component with something like Auth0
 */
interface Props {
  locationHash: string;
  Redirect?: null | RBAuthRedirect;
}
export const AuthCallback: React.FC<Props> = ({
  children,
  locationHash,
  Redirect,
}) => (
  <AuthContext.Consumer>
    {(auth) => {
      if (/access_token|id_token|error/.test(locationHash)) {
        auth.logic.handle();
        return <></>;
      }
      if (Redirect) return <Redirect to={auth.routes.public} />;
      else
        console.log(
          'AuthCallback has no redirect, be sure handleAuthentication has programatic redirection'
        );
      return <>{children}</>;
    }}
  </AuthContext.Consumer>
);
