import React from 'react';
import { Navigation } from './navigation';
import { Auth, RefreshApp } from 'react-rb-auth';
import 'react-native-gesture-handler';

import { AuthApi } from './services/AuthApi';
// import { Auth } from './services/Auth';
import { AuthReloading } from './components/AuthReloading';
import { AssetsLoader } from './services/AssetsLoader';
import { StyleContext, StyleContextValue } from './services/StyleService';

export const Main: React.FC = () => (
  <AssetsLoader>
    <StyleContext.Provider value={StyleContextValue}>
      <Auth api={AuthApi} routes={{ public: 'Home', private: 'Admin' }}>
        <RefreshApp locationPathName={'none'} AuthReloadingComp={AuthReloading}>
          <Navigation />
        </RefreshApp>
      </Auth>
    </StyleContext.Provider>
  </AssetsLoader>
);
