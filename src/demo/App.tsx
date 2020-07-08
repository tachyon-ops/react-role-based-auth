import React from 'react';
import { Switch, BrowserRouter, Link } from 'react-router-dom';

import Example from './components/Example';
import SecondExample from './components/SecondExample';
import LoginLogout from './components/LoginLogout';
import Auth from './services/Auth';
import { SecuredRoute, RBAuthReactContext } from '../lib';
import { AppAuthContext } from './services/AppAuthContext';

const App: React.FC = () => (
  <BrowserRouter>
    <Auth>
      <Example />

      <div className="Example">
        <Link to="/">Home</Link> <Link to="/secure">Secure</Link> <Link to="/super-secure">Super Secure</Link>
        <Switch>
          <SecuredRoute
            AuthContext={(AppAuthContext as unknown) as RBAuthReactContext}
            path="/secure"
            Comp={() => <h3>Secure area</h3>}
            NotAllowed={() => <h3>You are not allowed</h3>}
          />

          <SecuredRoute
            AuthContext={(AppAuthContext as unknown) as RBAuthReactContext}
            path="/super-secure"
            Comp={() => <h3>Super Secure area</h3>}
          />
        </Switch>
        <LoginLogout />
      </div>

      <SecondExample />
    </Auth>
  </BrowserRouter>
);

export default App;
