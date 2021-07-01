import React, { useContext } from 'react';
import { Screen } from '../ui/Screen';
import { StyleContext } from '../services/StyleService';
import { Text, Linking, View, TouchableOpacity, StyleSheet } from 'react-native';

const FontButton: React.FC = () => {
  const style = useContext(StyleContext);
  const styles = StyleSheet.create({
    text: { textAlign: 'center', ...style.typography.title, fontSize: 30 },
  });
  return (
    <TouchableOpacity onPress={() => Linking.openURL('http://www.onlinewebfonts.com')}>
      <Text style={styles.text}>oNline Web Fonts</Text>
    </TouchableOpacity>
  );
};

export const CreditsScreen: React.FC = () => {
  const style = useContext(StyleContext);
  return (
    <Screen>
      <Text style={style.typography.title}>Credits</Text>
      <View
        style={{
          display: 'flex',
          alignContent: 'space-between',
          paddingVertical: 20,
        }}
      >
        <Text style={{ ...style.typography.paragraph, textAlign: 'center' }}>Font made from</Text>
        <FontButton />
        <Text style={{ ...style.typography.paragraph, textAlign: 'center' }}>
          {' '}
          is licensed by CC BY 3.0
        </Text>
      </View>
    </Screen>
  );
};
