import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from 'react-rb-auth';

import { AppButton } from '../../ui/AppButton';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../ui/Screen';
import { StyleContext } from '../../services/StyleService';

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
          <Card
            title="John Doe"
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
        </View>
      </View>
    </Screen>
  );
};
