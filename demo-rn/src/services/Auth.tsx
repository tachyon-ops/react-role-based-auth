import React, { useEffect } from 'react';
import { AuthContext, RBAuthContextType } from 'react-rb-auth';

export const Auth: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [reloading, setReloading] = React.useState(true);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  useEffect(() => {
    setReloading(true);
    setTimeout(() => setReloading(false), 1000);
  }, []);

  const contextVal: RBAuthContextType = {
    authenticated,
    reloading,
    accessToken: 'is_it_an_access_token?',
    login,
    logout,
    handleAuthentication: () => null,
    silentAuth: () => null,
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
  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};
