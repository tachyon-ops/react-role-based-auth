import { createContext } from 'react';

import type { RBAuthContextType } from '..';
import type { RBAuthReactContext } from '../index';

export const AuthContext = createContext<RBAuthContextType>({
  authenticated: false, // to check if authenticated or not
  reloading: true,
  user: { role: 'public' }, // store all user details
  accessToken: '', // accessToken of user for Auth0
  login: () => console.log('please change initialteLogin'), // to start the login process
  logout: () => console.log('please change logout'), // logout the user
  silentAuth: () => console.log('please change silentAuth'),
  handleAuthentication: () => console.log('please change handleAuthentication'), // handle Auth0 login process
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
}) as RBAuthReactContext<any, any>;
