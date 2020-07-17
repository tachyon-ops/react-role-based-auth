import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from 'react-rb-auth';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';

import { AppButton } from '../../ui/AppButton';
import { Screen } from '../../ui/Screen';
import { StyleContext } from '../../services/StyleService';
import { AppAuthContext } from '../../services/AppAuthContext';

export const DashboardScreen: React.FC = () => {
  const style = useContext(StyleContext);
  const authContext = useContext(AuthContext);
  const nav = useNavigation();

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const logout = () => authContext.logic.logout();
  const goToCredits = () => nav.navigate('Credits');
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={style.typography.title}>Dashboard</Text>
        <View style={{ paddingVertical: 20 }}>
          <AppAuthContext.Consumer>
            {(auth) => (
              <Card
                title={auth.user.name}
                titleStyle={style.typography.title}
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
                <AppButton label="Credits" onPress={goToCredits} />
              </Card>
            )}
          </AppAuthContext.Consumer>
        </View>
      </View>
    </Screen>
  );
};
