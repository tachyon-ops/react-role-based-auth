import React, { useState, useEffect } from 'react';

import Example from './components/Example';
import SecondExample from './components/SecondExample';
import { Auth } from './services/Auth';
import LoginLogout from './components/LoginLogout';
import { UserModel } from './models/user';

const anonUser: UserModel = { name: '', role: 'visitor' };
const regUser: UserModel = { name: 'Role Based Auth', role: 'admin' };

const App: React.FC = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<UserModel>(anonUser);
  const login = () => {
    setAuth(true);
    setUser(regUser);
  };
  const logout = () => {
    setAuth(false);
    setUser(anonUser);
  };
  useEffect(() => {
    console.log('user: ', user, 'auth: ', auth);
  }, [auth, user]);
  return (
    <Auth authenticated={auth} user={user}>
      <Example>
        <LoginLogout login={login} logout={logout} />
      </Example>
      <SecondExample />
    </Auth>
  );
};

export default App;
