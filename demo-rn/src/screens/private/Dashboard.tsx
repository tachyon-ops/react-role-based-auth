import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from 'react-rb-auth';

import { AppButton } from '../../ui/AppButton';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../ui/Screen';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#DEC79B',
    fontSize: 30,
  },
});

export const DashboardScreen: React.FC = () => {
  const authContext = useContext(AuthContext);
  const nav = useNavigation();
  const onSignOut = () =>
    new Promise((resolve) => {
      authContext.logout();
      resolve();
    });
  const logout = () => onSignOut().then(() => nav.navigate('Home'));
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.text}>Dashboard</Text>
        <View style={{ paddingVertical: 20 }}>
          <Card
            title="John Doe"
            containerStyle={{ paddingVertical: 20, minWidth: 350 }}
          >
            <View
              style={{
                backgroundColor: '#bcbec1',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={{ color: 'white', fontSize: 28 }}>JD</Text>
            </View>
            <AppButton label="Logout" onPress={logout} />
          </Card>
        </View>
      </View>
    </Screen>
  );
};
