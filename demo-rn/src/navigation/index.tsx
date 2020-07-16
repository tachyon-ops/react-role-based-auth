import React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/public/Home';
import { LoginScreen } from '../screens/auth/Login';
import { SignupScreen } from '../screens/auth/SignUp';
import { DashboardScreen } from '../screens/private/Dashboard';
import { AuthContext } from '../../../src/lib/roles-based-auth/context';

const Stack = createStackNavigator();

const theme: Theme = {
  dark: true,
  colors: {
    primary: '#DEC79B',
    background: '#18181E',
    card: '#DEC79B',
    text: '#DEC79B',
    border: '#DEC79B',
    notification: '#DEC79B',
  },
};

export const Navigation: React.FC = () => (
  <AuthContext.Consumer>
    {(context) => (
      <NavigationContainer theme={theme}>
        <Stack.Navigator headerMode="none">
          {!context.authenticated ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Admin/Dashboard"
                component={DashboardScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )}
  </AuthContext.Consumer>
);
