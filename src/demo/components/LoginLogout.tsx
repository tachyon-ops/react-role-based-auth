import React from 'react';

import { AppAuthContext } from '../services/AppAuthContext';
import { regUser, editorUser } from '../models/user';

export const LoginLogout: React.FC = () => (
  <AppAuthContext.Consumer>
    {(auth) => (
      <>
        {!auth.isAuth && (
          <div>
            <h3>You are anonymous</h3>
            <button onClick={() => auth.logic.login(regUser)}>
              Login Admin
            </button>
            <button onClick={() => auth.logic.login(editorUser)}>
              Login Editor
            </button>
          </div>
        )}
        {auth.isAuth && (
          <div>
            <h3>Welcome USER!</h3>
            <h5>Your slug is: {auth.user.slug}</h5>
            <h5>Your name is: {auth.user.name}</h5>
            <button onClick={auth.logic.logout}>Logout</button>
          </div>
        )}
        <br />
        <br />
      </>
    )}
  </AppAuthContext.Consumer>
);
