import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from '../../ui/AppButton';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const goToLogin = () => navigation.navigate('Login');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <AppButton label="Login" onPress={goToLogin} />
    </View>
  );
};
