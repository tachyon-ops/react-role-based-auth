import React from 'react';

import { AppAuthContext } from '../services/AppAuthContext';

const LoginLogout: React.FC = (props) => (
  <AppAuthContext.Consumer>
    {(authContext) => (
      <div>
        {!authContext.authenticated && (
          <div>
            <h3>You are anonymous</h3>
            <button onClick={authContext.login}>Login</button>
          </div>
        )}
        {authContext.authenticated && (
          <div>
            <h3>Welcome USER!</h3>
            <h5>Your name is: {authContext.user.name}</h5>
            <button onClick={authContext.logout}>Logout</button>
          </div>
        )}
        <br />
        <br />
      </div>
    )}
  </AppAuthContext.Consumer>
);

export default LoginLogout;
