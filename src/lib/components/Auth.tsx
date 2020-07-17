import React, { useEffect } from 'react';

import {
  AuthApiInterface,
  RBAuthTokens,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
  RBAuthContextType,
} from '..';
import { AuthApiForContext } from '../authServices/BaseAuthApiWrapper';
import { AuthContext, RBAuthInitialUser } from '../roles-based-auth/context';

export const Auth: React.FC<{
  api: AuthApiInterface;
  routes?: { private: string; public: string };
}> = ({ children, api, routes }) => {
  const [auth, setAuth] = React.useState(false);
  const [reloading, setReloading] = React.useState(true);
  const [tokens, setTokens] = React.useState<RBAuthTokens>({
    accessToken: null,
    refreshToken: null,
  });
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

  useEffect(() => {
    logic.silent().catch((err) => console.log('Silent logic error: ', err));
  }, []);

  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};
