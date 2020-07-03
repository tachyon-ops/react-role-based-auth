import { createContext } from 'react';
import { Role } from './rbac-rules';

export type InitialUserType = { role: Role };
export interface UserType {
    role: Role;
}

type InitiateLoginType = () => void;
type SilentAuthType = () => void;
type HandleAuthenticationType = () => void;
type LogoutType = () => void;

export type AuthContextType<U> = {
    authenticated: boolean; // to check if authenticated or not
    reloading: boolean;
    user: U; // store all the user details
    accessToken: string; // accessToken of user for Auth0
    initiateLogin: InitiateLoginType; // to start the login process
    silentAuth: SilentAuthType;
    handleAuthentication: HandleAuthenticationType; // handle Auth0 login process
    logout: LogoutType; // logout the user
};

export const initialAuthContext = <T extends { role: Role }>() => {
    const result: AuthContextType<T> = {
        authenticated: false, // to check if authenticated or not
        reloading: true,
        user: {
            role: 'visitor',
        } as T, // store all the user details
        accessToken: '', // accessToken of user for Auth0
        initiateLogin: () => console.log('please change initialteLogin'), // to start the login process
        silentAuth: () => console.log('please change silentAuth'),
        handleAuthentication: () => console.log('please change handleAuthentication'), // handle Auth0 login process
        logout: () => console.log('please change logout'), // logout the user
    };
    return result;
};

const getAuthContextFromType = <T extends { role: Role }>() =>
    createContext<AuthContextType<T>>(initialAuthContext<T>());

export const getAuthContext = <T extends { role: Role }>() => {
    const authContext = getAuthContextFromType<T>();
    return {
        Provider: authContext.Provider,
        Consumer: authContext.Consumer,
    };
};
