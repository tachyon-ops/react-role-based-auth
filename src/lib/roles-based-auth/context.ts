import { createContext, Context } from 'react';

import { BaseRoles } from './rbac-rules';

/**
 * Types
 */
export type InitialUserType<Role extends BaseRoles> = { role: Role };
type InitiateLoginType = () => void;
type SilentAuthType = () => void;
type HandleAuthenticationType = () => void;
type LogoutType = () => void;

// Auth Context type
export type AuthContextType<TUser extends InitialUserType<BaseRoles>> = {
  authenticated: boolean; // to check if authenticated or not
  reloading: boolean;
  user: TUser; // store all the user details
  accessToken: string; // accessToken of user for Auth0
  initiateLogin: InitiateLoginType; // to start the login process
  silentAuth: SilentAuthType;
  handleAuthentication: HandleAuthenticationType; // handle Auth0 login process
  logout: LogoutType; // logout the user
  routes: {
    public: string;
    private: string;
  };
};

export const initialAuthContext: AuthContextType<InitialUserType<BaseRoles>> = {
  authenticated: false, // to check if authenticated or not
  reloading: true,
  // store all the user details
  user: { role: 'visitor' },
  accessToken: '', // accessToken of user for Auth0
  initiateLogin: () => console.log('please change initialteLogin'), // to start the login process
  silentAuth: () => console.log('please change silentAuth'),
  handleAuthentication: () => console.log('please change handleAuthentication'), // handle Auth0 login process
  logout: () => console.log('please change logout'), // logout the user
  routes: {
    public: '/',
    private: '/dashboard',
  },
};

type GetAuthContextType = <T extends InitialUserType<BaseRoles>>() => Context<AuthContextType<T>>;

export const getAuthContext: GetAuthContextType = <T extends InitialUserType<BaseRoles>>() =>
  createContext(initialAuthContext as AuthContextType<T>);
