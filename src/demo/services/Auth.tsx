import React, { useState } from 'react';
import { AuthContext } from '../../lib';

import { UserModel, anonUser } from '../models/user';
import { rules } from '../models/rules';

const PROCESS_TIME = 1000; // [ms] showcases reloading practices (async such as 'requests')

export const Auth: React.FC = ({ children }) => {
  const [authenticated, setAuth] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [user, setUser] = useState<UserModel>(anonUser);

  const startReload = () => setTimeout(() => setReloading(true));
  const finishReload = () => setTimeout(() => setReloading(false), 100);

  const login = (user: UserModel) => {
    startReload();
    setTimeout(() => {
      setAuth(true);
      setUser(user);
      finishReload();
      localStorage.setItem('user', JSON.stringify(user));
    }, PROCESS_TIME);
  };
  const logout = () => {
    startReload();
    setTimeout(() => {
      setAuth(false);
      setUser(anonUser);
      finishReload();
      localStorage.removeItem('user');
    }, PROCESS_TIME);
  };
  const silentAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const newUser = JSON.parse(storedUser);
      login(newUser);
    } else {
      finishReload();
    }
  };

  const setupAuthVal = () => ({
    authenticated,
    reloading,
    accessToken: 'is_it_an_access_token?',
    login,
    logout,
    handleAuthentication: () => null,
    silentAuth,
    routes: {
      public: '/',
      private: '/admin',
    },
    user,
    rules,
  });

  return <AuthContext.Provider value={setupAuthVal()}>{children}</AuthContext.Provider>;
};
