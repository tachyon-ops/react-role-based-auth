import React from 'react';

import { getAuthContext } from '../../lib';
import { UserModel } from '../models/user';

export const AppAuthContext = getAuthContext<UserModel>();

export const Auth: React.FC<{ authenticated: boolean; user: UserModel }> = ({
  children,
  authenticated = false,
  user = { name: '', role: 'visitor' },
}) => (
  <AppAuthContext.Provider
    value={{
      authenticated,
      reloading: false,
      accessToken: 'is_it_an_access_token?',
      initiateLogin: () => null,
      handleAuthentication: () => null,
      silentAuth: () => null,
      logout: () => null,
      routes: {
        public: '/',
        private: '/admin',
      },
      user,
    }}
  >
    {children}
  </AppAuthContext.Provider>
);
