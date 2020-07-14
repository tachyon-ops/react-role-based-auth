import React from 'react';
import { Switch, BrowserRouter, Link } from 'react-router-dom';

import { Example } from './components/Example';
import { SecondExample } from './components/SecondExample';
import { LoginLogout } from './components/LoginLogout';
import { Auth } from './services/Auth';
import { SecuredRoute, BrowserRefresh } from '../lib';

const Reloading: React.FC = () => (
  <div>
    <h3>Reloading...</h3>
    <br />
    <br />
  </div>
);

const AppMenu: React.FC = ({ children }) => <div className="appMenu">{children}</div>;
const AppLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <div className="appLink">
    <Link to={to}>{label}</Link>
  </div>
);

const App: React.FC = () => (
  <BrowserRouter>
    <Auth>
      <Example />

      <div className="Example appBounding">
        <AppMenu>
          <AppLink to="/" label="Home" />
          <AppLink to="/secure" label="Secure" />
          <AppLink to="/super-secure" label="Super Secure" />
        </AppMenu>
        <BrowserRefresh AuthReloadingComp={Reloading}>
          <Switch>
            <SecuredRoute
              path="/secure"
              Allowed={() => <h3>Secure area</h3>}
              NotAllowed={() => <h3>You are not allowed</h3>}
            />

            <SecuredRoute path="/super-secure" Allowed={() => <h3>Super Secure area</h3>} />
          </Switch>
          <LoginLogout />
        </BrowserRefresh>
      </div>

      <SecondExample />
    </Auth>
  </BrowserRouter>
);

export default App;