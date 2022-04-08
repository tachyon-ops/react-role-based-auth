import React from 'react';

import { NavBar } from './components/NavBar';
import { Example } from './components/Example';
import { LoginLogout } from './components/LoginLogout';
import { SecondExample } from './components/SecondExample';
import { Routing } from './Routing';

export const App: React.FC = () => (
  <>
    <Example />
    <div className='Example appBounding'>
      <NavBar />
      <Routing />
      <LoginLogout />
    </div>

    <SecondExample />
  </>
);
