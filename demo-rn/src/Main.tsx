import React from 'react';
import { Navigation } from './navigation';
import { View, Text, StyleSheet } from 'react-native';
import { RefreshApp } from 'react-rb-auth';
import 'react-native-gesture-handler';

import { Auth } from './services/Auth';
import { AuthReloading } from './components/AuthReloading';

export const Main: React.FC = () => (
  <Auth>
    <RefreshApp locationPathName={'none'} AuthReloadingComp={AuthReloading}>
      <Navigation />
    </RefreshApp>
  </Auth>
);
