import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { RefreshApp, AuthContext, RBAuthContextType } from 'react-rb-auth';

const Auth: React.FC = ({ children }) => {
  const [authenticated] = React.useState(false);
  const [reloading, setReloading] = React.useState(true);

  useEffect(() => {
    setReloading(true);
    setTimeout(() => setReloading(false), 1000);
  }, []);

  const contextVal: RBAuthContextType = {
    authenticated,
    reloading,
    accessToken: 'is_it_an_access_token?',
    login: () => null,
    logout: () => null,
    handleAuthentication: () => null,
    silentAuth: () => null,
    routes: {
      public: '/',
      private: '/admin',
    },
    user: { role: 'public' },
    rules: {
      admin: {},
      public: {},
    },
  };
  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    // AwesomeModule.multiply(3, 7).then(setResult);
    setResult(20);
  }, []);

  return (
    <Auth>
      <RefreshApp
        locationPathName={'none'}
        AuthReloadingComp={() => (
          <View>
            <Text>Reloading...</Text>
          </View>
        )}
      >
        <View style={styles.container}>
          <Text>Result: {result}</Text>
        </View>
      </RefreshApp>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
