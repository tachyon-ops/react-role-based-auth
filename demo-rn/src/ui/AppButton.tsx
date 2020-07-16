import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DEC79B',
    color: '#18181E',

    borderColor: '#DEC79B',
    borderStyle: 'solid',
    borderWidth: 3,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontSize: 25,
    alignSelf: 'center',
  },
});

export const AppButton: React.FC<{
  onPress: VoidFunction;
  label: string;
  size?: number;
}> = ({ onPress, label, size = 20 }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={{ ...styles.text, fontSize: size }}>{label}</Text>
  </TouchableOpacity>
);
