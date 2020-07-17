import React from 'react';
import { Navigation } from './navigation';
import { RefreshApp } from 'react-rb-auth';
import 'react-native-gesture-handler';

import { Auth } from './services/Auth';
import { AuthReloading } from './components/AuthReloading';
import { AssetsLoader } from './services/AssetsLoader';
import { StyleContext, StyleContextValue } from './services/StyleService';

export const Main: React.FC = () => (
  <AssetsLoader>
    <StyleContext.Provider value={StyleContextValue}>
      <Auth>
        <RefreshApp locationPathName={'none'} AuthReloadingComp={AuthReloading}>
          <Navigation />
        </RefreshApp>
      </Auth>
    </StyleContext.Provider>
  </AssetsLoader>
);
