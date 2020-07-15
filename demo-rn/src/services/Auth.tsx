import React, { useEffect } from 'react';
import { AuthContext, RBAuthContextType } from 'react-rb-auth';

export const Auth: React.FC = ({ children }) => {
  const [authenticated] = React.useState(false);
  const [reloading, setReloading] = React.useState(true);

  useEffect(() => {
    setReloading(true);
    setTimeout(() => setReloading(false), 1000);
  }, []);

  const contextVal: RBAuthContextType = {
    authenticated,
    reloading,
    accessToken: 'is_it_an_access_token?',
    login: () => null,
    logout: () => null,
    handleAuthentication: () => null,
    silentAuth: () => null,
    routes: {
      public: '/',
      private: '/admin',
    },
    user: { role: 'public' },
    rules: {
      admin: {},
      public: {},
    },
  };
  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};
