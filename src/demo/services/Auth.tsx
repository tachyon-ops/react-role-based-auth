import React, { useState } from 'react';

import { UserModel, anonUser, regUser } from '../models/user';
import { AuthContext } from '../../lib';

const PROCESS_TIME = 1000; // [ms] showcases reloading practices (async such as 'requests')

const Auth: React.FC = ({ children }) => {
  const [authenticated, setAuth] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [user, setUser] = useState<UserModel>(anonUser);

  const startReload = () => setTimeout(() => setReloading(true));
  const finishReload = () => setTimeout(() => setReloading(false), 100);

  const login = () => {
    startReload();
    setTimeout(() => {
      console.log('login');
      setAuth(true);
      setUser(regUser);
      finishReload();
    }, PROCESS_TIME);
  };
  const logout = () => {
    startReload();
    setTimeout(() => {
      console.log('logout');
      setAuth(false);
      setUser(anonUser);
      finishReload();
    }, PROCESS_TIME);
  };

  const setupAuthVal = () => ({
    authenticated,
    reloading,
    accessToken: 'is_it_an_access_token?',
    login,
    logout,
    handleAuthentication: () => null,
    silentAuth: login,
    routes: {
      public: '/',
      private: '/admin',
    },
    user,
  });

  return <AuthContext.Provider value={setupAuthVal()}>{children}</AuthContext.Provider>;
};

export default Auth;
