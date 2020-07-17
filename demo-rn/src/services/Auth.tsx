import React, { useEffect } from 'react';
import {
  AuthContext,
  RBAuthContextType,
  AuthApiForContext,
} from 'react-rb-auth';

import { AuthApi } from './AuthApi';

export const Auth: React.FC = ({ children }) => {
  const [auth, setAuth] = React.useState(false);
  const [reloading, setReloading] = React.useState(true);
  const logic = new AuthApiForContext(setAuth, setReloading, AuthApi);
  const contextVal: RBAuthContextType = {
    isAuth: auth,
    reloading,
    accessToken: 'is_it_an_access_token?',
    logic,
    routes: {
      public: 'Home',
      private: 'Admin',
    },
    user: { role: 'public' },
    rules: {
      admin: {},
      public: {},
    },
  };

  useEffect(() => {
    logic.silent();
  }, []);

  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};

// const login = (
//   AuthApi.login,
//   onSuccess?: VoidFunction,
//   onFailure?: VoidFunction
// ) =>

//     .then(() => {
//       if (onSuccess) onSuccess();
//     })
//     .catch(() => {
//       if (onFailure) onFailure();
//     });

// const signUp = (
//   args: EmailPasswordType,
//   onSuccess?: VoidFunction,
//   onFailure?: VoidFunction
// ) =>
//   new Promise((resolve, reject) => {
//     if (args.email === 'nmpribeiro@gmail.com' && args.password === 'test')
//       resolve();
//     else reject();
//   })
//     .then(() => {
//       if (onSuccess) onSuccess();
//     })
//     .catch(() => {
//       if (onFailure) onFailure();
//     });

// const logout = (onSuccess?: VoidFunction, onFailure?: VoidFunction) =>
//   new Promise((resolve) => {
//     setAuthenticated(false);
//     resolve();
//   })
//     .then(() => {
//       if (onSuccess) onSuccess();
//     })
//     .catch(() => {
//       if (onFailure) onFailure();
//     });
