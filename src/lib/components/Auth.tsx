import React from 'react';

import {
  AuthApiInterface,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
  RBAuthContextType,
} from '..';
import { AuthApiForContext } from '../authServices/BaseAuthApiWrapper';
import {
  AuthContext,
  RBAuthInitialUser,
  RBAuthInitialToken,
} from '../roles-based-auth/context';

export const Auth: React.FC<{
  api: AuthApiInterface;
  routes?: { private: string; public: string };
}> = ({ children, api, routes }) => {
  const [auth, setAuth] = React.useState(false);
  const [reloading, setReloading] = React.useState(true);
  const [tokens, setTokens] = React.useState<RBAuthTokensType>(
    RBAuthInitialToken
  );
  const [user, setUser] = React.useState<
    RBAuthUserModelWithRole<RBAuthBaseRoles>
  >(RBAuthInitialUser);

  const logic = new AuthApiForContext(
    setAuth,
    setReloading,
    setTokens,
    setUser,
    api
  );

  const contextVal: RBAuthContextType = {
    isAuth: auth,
    reloading,
    tokens,
    logic,
    routes,
    user,
    rules: {
      admin: {},
      public: {},
    },
  };

  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};
