import React from 'react';
import { useFonts } from 'expo-font';
import { Text, View, ActivityIndicator } from 'react-native';

export const AssetsLoader: React.FC = ({ children }) => {
  const [loaded, error] = useFonts({
    WalsheimBold: require('../assets/fonts/GTWalsheimProBoldRegular.ttf'),
    WalsheimLight: require('../assets/fonts/GTWalsheimProLight.ttf'),
  });

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 30 }}>{error.name}</Text>
        <Text style={{ textAlign: 'center' }}>{error.message}</Text>
        <Text style={{ padding: 10 }}>Stack: {error.stack}</Text>
      </View>
    );
  }
  if (!loaded) {
    return <ActivityIndicator />;
  }

  return <>{children}</>;
};
