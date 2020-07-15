import React from 'react';

import { AppAuthContext } from '../services/AppAuthContext';
import { regUser, editorUser } from '../models/user';

export const LoginLogout: React.FC = () => (
  <AppAuthContext.Consumer>
    {(authContext) => (
      <>
        {!authContext.authenticated && (
          <div>
            <h3>You are anonymous</h3>
            <button onClick={() => authContext.login(regUser)}>Login Admin</button>
            <button onClick={() => authContext.login(editorUser)}>Login Editor</button>
          </div>
        )}
        {authContext.authenticated && (
          <div>
            <h3>Welcome USER!</h3>
            <h5>Your slug is: {authContext.user.slug}</h5>
            <h5>Your name is: {authContext.user.name}</h5>
            <button onClick={authContext.logout}>Logout</button>
          </div>
        )}
        <br />
        <br />
      </>
    )}
  </AppAuthContext.Consumer>
);
