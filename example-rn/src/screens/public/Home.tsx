import React, { useContext } from 'react';
import { View, Text, ScrollView, Linking, Image, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from 'react-native-elements';

import { AppButton } from '../../ui/AppButton';
import { Screen } from '../../ui/Screen';
import { StyleContext } from '../../services/StyleService';
import { Column } from '../../ui/table/Column';
import { Row } from '../../ui/table/Row';
import { TableUIType, Table } from '../../ui/table/Table';

const images = [
  {
    key: 1,
    name: 'Nathan Anderson',
    url: 'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg', // 'https://unsplash.com/photos/C9t94JC4_L8',
  },
  {
    key: 2,
    name: 'Jamison McAndie',
    url: 'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg', // 'https://unsplash.com/photos/waZEHLRP98s',
  },
  {
    key: 3,
    name: 'Alberto Restifo',
    url: 'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg', // 'https://unsplash.com/photos/cFplR9ZGnAk',
  },
  {
    key: 4,
    name: 'John Towner',
    url: 'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg', // 'https://unsplash.com/photos/89PFnHKg8HE',
  },
];

export const HomeScreen: React.FC = () => {
  const nav = useNavigation();
  const style = useContext(StyleContext);
  const goToLogin = () => nav.navigate('Login');
  const goToCredits = () => nav.navigate('Credits');

  const getBorder = (color: string = 'red'): ViewStyle => ({
    borderColor: color,
    borderWidth: 1,
    borderStyle: 'solid',
  });

  const tableData: TableUIType<3, 3> = {
    attributes: {
      weigth: [3, 0, 0],
      nthColumnStyle: [null, null, { borderTopColor: 'black', borderTopWidth: 3 }],
      // columnStyle: { flex: 1, ...getBorder('blue'), padding: 10 },
      rowStyle: { justifyContent: 'center' },
    },
    content: [
      [<Text>Text 1</Text>, <Text>Text 2</Text>, <Text>Text 3</Text>],
      [<Text>Text 1</Text>, <Text>Text 2 bla blalblabl </Text>, <Text>Text 3</Text>],
      [
        <View
          style={{
            borderLeftColor: 'red',
            borderLeftWidth: 20,
            flex: 1,
            marginLeft: -20,
          }}
        >
          <Text>Text 1</Text>
        </View>,
        <Text>Text 2 bla blalblabl </Text>,
        <Text>Text 3</Text>,
      ],
    ],
  };

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style.typography.title}>Home Screen</Text>

        <Text style={style.typography.title}>Test table</Text>

        <Table data={tableData} />

        <Text style={style.typography.paragraph}>
          Thanks to https://github.com/spencercarli/react-navigation-auth-flow
        </Text>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            {images.map(({ name, url, key }) => (
              <Card title={`CARD ${key}`} key={key}>
                <Image
                  source={{ uri: url }}
                  style={{
                    height: 200,
                    width: 200,
                    resizeMode: 'stretch',
                    margin: 5,
                  }}
                />
                <Text style={{ marginBottom: 10 }}>Photo by {name}.</Text>
                <Button
                  buttonStyle={{ backgroundColor: style.color.secondary }}
                  title="VIEW NOW"
                  onPress={() => Linking.openURL(url)}
                />
              </Card>
            ))}
          </ScrollView>
        </View>
        <AppButton label="Login" onPress={goToLogin} />
        <AppButton label="Credits" onPress={goToCredits} />
      </View>
    </Screen>
  );
};
