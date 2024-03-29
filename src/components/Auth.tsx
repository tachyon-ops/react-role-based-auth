import React, { useEffect } from 'react';

import { RBAuthErrors } from '../rb-auth-errors';
import { BaseAuthApiWrapper } from '../authServices/BaseAuthApiWrapper';
import { AuthContext, RBAuthInitialUser } from '../roles-based-auth/context';
import { PartialAuthApi, RBAuthUserModelWithRole, RBAuthBaseRoles, RBAuthContextType } from '..';

export const Auth: React.FC<{
  children: React.ReactNode;
  authApi: PartialAuthApi;
  routes?: { private: string; public: string };
  onAuthExpired?: (e: RBAuthErrors) => void;
  appApis?: Record<string, unknown>;
  monitorUserChanges?: null | ((user: RBAuthUserModelWithRole<RBAuthBaseRoles> | null) => void);
  isAuthLogic?: (user: RBAuthUserModelWithRole<RBAuthBaseRoles> | null) => boolean;
  debug?: boolean;
}> = ({
  children,
  authApi,
  routes,
  onAuthExpired,
  appApis = {},
  monitorUserChanges = null,
  isAuthLogic = (user) => {
    const result = !!(user && user.role && user.role !== 'public');
    console.log(
      'Using default user logic for user with role "public" to be not authenticated. User role: ',
      user?.role
    );
    return result;
  },
  debug = false,
}) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [reloading, setReloading] = React.useState(true);
  const [user, setUser] = React.useState<RBAuthUserModelWithRole<RBAuthBaseRoles> | null>(null);

  const logic = new BaseAuthApiWrapper({ setReloading, setUser, authApi, onAuthExpired, appApis });

  useEffect(() => {
    if (debug) console.log('ReactRBAuth::user changed');
    if (isAuthLogic) setIsAuth(isAuthLogic(user));
    if (monitorUserChanges) monitorUserChanges(user);
  }, [user]);

  const contextVal: RBAuthContextType = {
    isAuth,
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
