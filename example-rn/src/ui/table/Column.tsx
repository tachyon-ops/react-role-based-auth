import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}
export const Column: React.FC<Props> = ({ children, style }) => (
  <View style={style}>{children}</View>
);
