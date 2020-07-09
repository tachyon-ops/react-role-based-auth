import React from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '..';

interface Props {
  location: { hash: string };
  redirect?: boolean;
}
export const AuthCallback: React.FC<Props> = (props) => (
  <AuthContext.Consumer>
    {(authContext) => {
      if (/access_token|id_token|error/.test(props.location.hash)) authContext.handleAuthentication();
      if (props.redirect) return <Redirect to={authContext.routes.public} />;
      else console.log('AuthCallback has no redirect, be sure handleAuthentication has programatic redirection');
      return <>{props.children}</>;
    }}
  </AuthContext.Consumer>
);
