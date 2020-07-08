import React from 'react';
import { AppAuthContext } from '../services/Auth';

const LoginLogout: React.FC<{ login: VoidFunction; logout: VoidFunction }> = (props) => (
  <AppAuthContext.Consumer>
    {(context) => (
      <div>
        {!context.authenticated && (
          <div>
            <h3>You are anonymous</h3>
            <button onClick={props.login}>Login</button>
          </div>
        )}
        {context.authenticated && (
          <div>
            <h3>Welcome USER!</h3>
            <h5>Your name is: {context.user.name}</h5>
            <button onClick={props.logout}>Logout</button>
          </div>
        )}
        <br />
        <br />
      </div>
    )}
  </AppAuthContext.Consumer>
);

export default LoginLogout;
