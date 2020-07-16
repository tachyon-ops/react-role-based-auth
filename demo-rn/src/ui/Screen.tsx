import React from 'react';
import { SafeAreaView, View } from 'react-native';

export const Screen: React.FC = ({ children }) => (
  <SafeAreaView style={{ margin: 25 }}>
    {children}
    {/* <View style={{ borderColor: 'red', borderWidth: 3 }}>{children}</View> */}
  </SafeAreaView>
);
