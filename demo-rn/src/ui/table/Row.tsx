import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}
export const Row: React.FC<Props> = ({ children, style }) => (
  <View style={[style, { flexDirection: 'row' }]}>{children}</View>
);
