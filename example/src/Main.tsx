import React, { useEffect, useState } from 'react';
import { Auth, TokenUtil, RefreshApp, RBAuthErrors } from 'react-rb-auth';

import { AppStorage } from './services/AppLocalStorage';
import { AuthApi } from './services/AuthApi';

import App from './App';
import { GlobalAppApi } from './services/ExternalApi';

const AuthReloading: React.FC = () => (
  <Spinner>
    <h3>AuthReloading</h3>
  </Spinner>
);
const AuthLoading: React.FC = () => (
  <Spinner>
    <h3>AuthLoading</h3>
  </Spinner>
);
const Spinner: React.FC = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      display: 'flex',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }}
  >
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

export const Main: React.FC = () => {
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    TokenUtil.setStorage(new AppStorage(setInitiated));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('is initiated: ', initiated);
  }, [initiated]);

  const onAuthExpired = (errorMsg: RBAuthErrors, error?: Error) =>
    setTimeout(() => {
      alert(errorMsg);
      // eslint-disable-next-line no-console
      error && console.log(error);
    });

  if (!initiated) return <></>;

  return (
    <Auth
      authApi={AuthApi}
      routes={{ private: '/super-secure', public: '/' }}
      onAuthExpired={onAuthExpired}
      appApis={GlobalAppApi}
    >
      <RefreshApp
        locationPathName={'none'}
        AuthReloadingComp={AuthReloading}
        AuthLoadingComp={AuthLoading}
      >
        <App />
      </RefreshApp>
    </Auth>
  );
};
