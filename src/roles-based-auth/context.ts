/* eslint-disable no-console */
import { createContext } from 'react'
import {
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
  RBAuthTokensType,
  RBAuthContextType,
  RBAuthReactContext,
} from '..'

export const RBAuthInitialUser: RBAuthUserModelWithRole<RBAuthBaseRoles> = {
  role: 'public',
}
export const RBAuthInitialToken: RBAuthTokensType = {
  accessToken: '',
  refreshToken: '',
  openIdToken: '',
  tokenType: '',
  expiresIn: '',
  scope: '',
}

export const AuthContext = createContext<RBAuthContextType>({
  // to check if authenticated or not
  isAuth: false,
  reloading: true,
  // store user
  user: RBAuthInitialUser,
  // accessToken of user for Auth0
  logic: {
    // login process
    login: async () => console.log('please change login'),
    // signup process
    signup: async () => console.log('please change signup'),
    // logout the user
    logout: async () => console.log('please change logout'),
    silent: async () => console.log('please change silent'),
    // handle Auth0 login process
    handle: async () => console.log('please change handle'),
    refresh: async () => console.log('please change refresh'),
    apis: {},
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
}) as RBAuthReactContext<any, any, any, any, any, any, any, any, any>
