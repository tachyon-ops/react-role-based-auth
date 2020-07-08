import React, { useState } from 'react';

import { UserModel, anonUser, regUser } from '../models/user';
import { AppAuthContext } from './AppAuthContext';

const Auth: React.FC = ({ children }) => {
  const [authenticated, setAuth] = useState(false);
  const [user, setUser] = useState<UserModel>(anonUser);

  const login = () => {
    setAuth(true);
    setUser(regUser);
  };
  const logout = () => {
    setAuth(false);
    setUser(anonUser);
  };

  const setupAuthVal = () => ({
    authenticated,
    reloading: false,
    accessToken: 'is_it_an_access_token?',
    login: login,
    logout: logout,
    handleAuthentication: () => null,
    silentAuth: () => null,
    routes: {
      public: '/',
      private: '/admin',
    },
    user,
  });

  return <AppAuthContext.Provider value={setupAuthVal()}>{children}</AppAuthContext.Provider>;
};

export default Auth;
