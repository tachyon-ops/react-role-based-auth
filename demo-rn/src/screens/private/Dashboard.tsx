import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import { AuthContext, ApiAccessBuilder } from 'react-rb-auth';

import { AppButton } from '../../ui/AppButton';
import { Screen } from '../../ui/Screen';
import { StyleContext } from '../../services/StyleService';
import { AppAuthContext } from '../../services/AppAuthContext';
import { AppApi } from '../../services/ExternalApi';
import { Utils } from '../../services/Utils';

const PIC_SIZE = 100;

type RetrievedUserType = {
  nickname: string;
  date: Date;
  lastFetched: Date;
};

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

  const [retrievedUser, setRetrievedUser] = useState<RetrievedUserType>(null);
  const onUserHandler = new ApiAccessBuilder(AppApi.getUserCheckAccessToken)
    .withSuccess((res) => {
      console.log('success: ', res);
      setRetrievedUser({
        nickname: ((res as unknown) as RetrievedUserType).nickname,
        date: new Date(),
        lastFetched: retrievedUser?.date || null,
      });
    })
    .withFailure((error) => console.log('failure: ', error));

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={style.typography.title}>Dashboard</Text>
        <View style={{ paddingVertical: 20 }}>
          <AppAuthContext.Consumer>
            {({ logic: { refresh }, user }) => (
              <Card
                title={user.name}
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
                  {user.picture && (
                    <Image
                      source={{ uri: user.picture, width: PIC_SIZE, height: PIC_SIZE }}
                      style={{ borderRadius: PIC_SIZE / 2 }}
                    />
                  )}
                  {!user.picture && (
                    <Text style={{ ...style.typography.title, color: 'white', fontSize: 28 }}>
                      {Utils.get2Chars(user.name)}
                    </Text>
                  )}
                </View>
                <AppButton label="Check AccessToken" onPress={onUserHandler.build(refresh)} />
                <AppButton label="Logout" onPress={logout} />
                <AppButton label="Credits" onPress={goToCredits} />
                {retrievedUser && (
                  <View>
                    <Text>Got user: </Text>
                    <Text>{retrievedUser.nickname}</Text>
                    <Text>
                      Last retrieved:
                      {`\u0009${Utils.formatDate(retrievedUser.lastFetched)}`}
                    </Text>
                    <Text>
                      Retrieved:
                      {`\u0009\u0009${Utils.formatDate(retrievedUser.date)}`}
                    </Text>
                  </View>
                )}
              </Card>
            )}
          </AppAuthContext.Consumer>
        </View>
      </View>
    </Screen>
  );
};
