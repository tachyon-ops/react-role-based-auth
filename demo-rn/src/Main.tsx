import React, { useState, useEffect } from 'react';
import { Navigation } from './navigation';
import { Auth, RefreshApp, TokenUtil } from 'react-rb-auth';
import 'react-native-gesture-handler';

import { AuthApi } from './services/AuthApi';
import { AuthReloading, AuthLoading } from './components/AuthReloading';
import { AssetsLoader } from './services/AssetsLoader';
import { StyleContext, StyleContextValue } from './services/StyleService';
import { AppStorage } from './services/AppLocalStorage';
import { Alert } from 'react-native';
import { GlobalAppApi } from './services/ExternalApi';

export const Main: React.FC = () => {
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    // new AppStorage(setInitiated);
    TokenUtil.setStorage(new AppStorage(setInitiated));
  }, []);

  useEffect(() => {
    console.log('is initiated: ', initiated);
  }, [initiated]);

  const routes = { public: 'Home', private: 'Admin' };
  const authExpired = () => Alert.alert('You have been inactive for too long');

  return (
    <AssetsLoader>
      <StyleContext.Provider value={StyleContextValue}>
        {initiated && (
          <Auth
            authApi={AuthApi}
            routes={routes}
            onAuthExpired={authExpired}
            appApis={GlobalAppApi}
          >
            <RefreshApp
              locationPathName={'none'}
              AuthReloadingComp={AuthReloading}
              AuthLoadingComp={AuthLoading}
            >
              <Navigation />
            </RefreshApp>
          </Auth>
        )}
      </StyleContext.Provider>
    </AssetsLoader>
  );
};
