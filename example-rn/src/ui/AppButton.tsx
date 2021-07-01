import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StyleContext } from '../services/StyleService';

export const AppButton: React.FC<{
  onPress: VoidFunction;
  label: string;
  size?: number;
}> = ({ onPress, label, size = 20 }) => {
  const style = useContext(StyleContext);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: style.color.secondary,
      padding: 10,
      borderRadius: 5,
      margin: 5,
    },
    text: {
      ...style.typography.button,
      fontSize: 25,
      textAlign: 'center',
      paddingHorizontal: 30,
      minWidth: 150,
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};
