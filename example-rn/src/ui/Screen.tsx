import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export const Screen: React.FC = ({ children }) => (
  <SafeAreaView style={StyleSheet.absoluteFillObject}>{children}</SafeAreaView>
);
