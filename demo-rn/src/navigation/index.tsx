import React, { useContext } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/public/Home';
import { LoginScreen } from '../screens/public/auth/Login';
import { SignupScreen } from '../screens/public/auth/SignUp';
import { DashboardScreen } from '../screens/private/Dashboard';
import { AuthContext } from '../../../src/lib/roles-based-auth/context';
import { CreditsScreen } from '../screens/Credits';
import { StyleContext } from '../services/StyleService';

const Stack = createStackNavigator();

export const Navigation: React.FC = () => {
  const style = useContext(StyleContext);
  const theme: Theme = {
    dark: true,
    colors: {
      primary: style.color.primary,
      background: style.color.background,
      card: style.color.secondary,
      text: style.color.secondary,
      border: style.color.secondary,
      notification: style.color.secondary,
    },
  };
  return (
    <AuthContext.Consumer>
      {(context) => (
        <NavigationContainer theme={theme}>
          <Stack.Navigator headerMode="none">
            {!context.isAuth ? (
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
            <Stack.Screen name="Credits" component={CreditsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Consumer>
  );
};
