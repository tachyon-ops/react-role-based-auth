import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RefreshApp } from 'react-rb-auth';

import { Auth } from './services/Auth';

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
