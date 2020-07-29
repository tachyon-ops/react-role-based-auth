import React from 'react';

import { RBAuthUserModelWithRole, RBAuthBaseRoles, RBAuthContextType } from '..';
import { BaseAuthApiWrapper } from '../authServices/BaseAuthApiWrapper';
import { AuthContext, RBAuthInitialUser } from '../roles-based-auth/context';
import { PartialAuthApi } from '../index';

export const Auth: React.FC<{
  api: PartialAuthApi;
  routes?: { private: string; public: string };
}> = ({ children, api, routes }) => {
  // const [auth, setAuth] = React.useState(false);
  const [reloading, setReloading] = React.useState(true);
  const [user, setUser] = React.useState<RBAuthUserModelWithRole<RBAuthBaseRoles>>(null);

  const logic = new BaseAuthApiWrapper(setReloading, setUser, api);

  const contextVal: RBAuthContextType = {
    isAuth: !!user,
    reloading,
    logic,
    routes,
    user: user || RBAuthInitialUser,
    rules: {
      admin: {},
      public: {},
    },
  };

  return <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>;
};
