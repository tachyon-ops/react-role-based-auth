import React, { useContext, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../roles-based-auth/context';

interface Props {
    setAuthReloaded: VoidFunction;
    authCallbackRoute: string;
    isAuthReloaded: boolean;
    AuthReloadingComp: () => ReactElement;
}

export const BrowserRefresh: React.FC<Props> = (props) => {
    const location = useLocation();
    const authContext = useContext(AuthContext);

    const tryAuthRefresh = async () => {
        await props.setAuthReloaded();
        if (location.pathname === props.authCallbackRoute) return;
        try {
            await authContext.silentAuth();
        } catch (err) {
            if (err.error !== 'login_required') console.log(err.error);
        }
    };

    if (!props.isAuthReloaded) tryAuthRefresh();

    if (location.pathname !== props.authCallbackRoute && authContext.reloading) return <props.AuthReloadingComp />;
    return <>{props.children}</>;
};
