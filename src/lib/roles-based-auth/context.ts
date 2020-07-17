import { createContext } from 'react';

import { RBAuthContextType, RBAuthReactContext } from '..';

export const AuthContext = createContext<RBAuthContextType>({
  // to check if authenticated or not
  isAuth: false,
  reloading: true,
  // store user
  user: { role: 'public' },
  // accessToken of user for Auth0
  accessToken: '',
  logic: {
    // login process
    login: async () => console.log('please change initialteLogin'),
    // signup process
    signup: async () => console.log('please change initialteLogin'),
    // logout the user
    logout: async () => console.log('please change logout'),
    silent: async () => console.log('please change silentAuth'),
    // handle Auth0 login process
    handle: async () =>
      console.log('please change handleAuthentication'),
  },
  routes: {
    public: '/',
    private: '/dashboard',
  },
  rules: {
    // visitor permissions
    public: {
      static: ['home-page:visit'],
    },
    // admin permissions
    admin: {
      static: ['home-page:visit', 'dashboard-page:visit'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as RBAuthReactContext<any, any, any>;
