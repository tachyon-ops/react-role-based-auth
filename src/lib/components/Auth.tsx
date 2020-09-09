import React, { useEffect } from 'react';

import { RBAuthUserModelWithRole, RBAuthBaseRoles, RBAuthContextType } from '..';
import { BaseAuthApiWrapper } from '../authServices/BaseAuthApiWrapper';
import { AuthContext, RBAuthInitialUser } from '../roles-based-auth/context';
import { PartialAuthApi, RBAuthErrors } from '../index';

export const Auth: React.FC<{
  authApi: PartialAuthApi;
  routes?: { private: string; public: string };
  onAuthExpired?: (e: RBAuthErrors) => void;
  appApis?: Record<string, unknown>;
}> = ({ children, authApi, routes, onAuthExpired, appApis = {} }) => {
  const [reloading, setReloading] = React.useState(true);
  const [user, setUser] = React.useState<RBAuthUserModelWithRole<RBAuthBaseRoles> | null>(null);

  const logic = new BaseAuthApiWrapper(setReloading, setUser, authApi, onAuthExpired, appApis);

  useEffect(() => {
    console.log('user changed: ', user);
  }, [user]);

  const contextVal: RBAuthContextType = {
    isAuth: !!(user && user.role && user.role !== 'public'),
    reloading,
    logic,
    routes: { private: routes?.private || '/private', public: routes?.public || '/' },
    user: user || RBAuthInitialUser,
    rules: {
      admin: {},
      public: {},
    },
  };

  return <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>;
};
