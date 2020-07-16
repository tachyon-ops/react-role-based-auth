import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SignupScreen = () => {
  const nav = useNavigation();
  const login = () => nav.navigate('Login');
  return (
    <View>
      <Text>Signup</Text>
      <TouchableOpacity onPress={login}>
        <Text>Go to Login View</Text>
      </TouchableOpacity>
    </View>
  );
};
