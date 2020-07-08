import { createContext } from 'react';
import { RBAuthContextType, RBAuthUser } from '..';

type GetInitialAuthContextType = <U extends RBAuthUser>(user?: U) => RBAuthContextType<U>;
export const getInitialAuthContext: GetInitialAuthContextType = (user) => ({
  authenticated: false, // to check if authenticated or not
  reloading: true,
  // store all the user details
  user: user,
  accessToken: '', // accessToken of user for Auth0
  login: () => console.log('please change initialteLogin'), // to start the login process
  logout: () => console.log('please change logout'), // logout the user
  silentAuth: () => console.log('please change silentAuth'),
  handleAuthentication: () => console.log('please change handleAuthentication'), // handle Auth0 login process
  routes: {
    public: '/',
    private: '/dashboard',
  },
});

export const AuthContext = createContext(
  getInitialAuthContext<RBAuthUser>({ role: 'visitor' })
);
