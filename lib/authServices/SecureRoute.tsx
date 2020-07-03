import React, { useContext, ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../roles-based-auth/context';

export const SecuredRoute: React.FC<{ component: () => ReactElement; path: string }> = ({ component, path }) => {
    const authContext = useContext(AuthContext);
    const Component = component;
    return (
        <Route
            path={path}
            render={() => {
                if (!authContext.authenticated) return <Redirect to={authContext.routes.public} />;
                return <Component />;
            }}
        />
    );
};
