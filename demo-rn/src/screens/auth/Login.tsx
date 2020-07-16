import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppButton } from '../../ui/AppButton';
import { AuthContext } from 'react-rb-auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#DEC79B',
    fontSize: 20,
  },
});

export const LoginScreen: React.FC = (props) => {
  const emailRef = React.createRef<Input>();
  const passwordRef = React.createRef<Input>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);

  const onEmailChange = (text: string) => setEmail(text);
  const onPasswordChange = (text: string) => setPassword(text);
  const next = () => setTimeout(() => passwordRef.current.focus(), 100);

  useEffect(() => {
    // emailRef.current.focus();
  }, []);

  const nav = useNavigation();
  const submit = () => {};
  const signup = () => nav.navigate('Signup');

  const onSignIn = () =>
    new Promise((resolve) => {
      authContext.login();
      resolve();
    });
  const login = () => onSignIn().then(() => nav.navigate('Admin/Dashboard'));
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Card
            title="Login"
            containerStyle={{ paddingVertical: 20, minWidth: 350 }}
          >
            <Input
              autoFocus
              keyboardType="email-address"
              ref={emailRef}
              value={email}
              label="Email"
              placeholder="Email address..."
              onChangeText={onEmailChange}
              returnKeyType="next"
              // onEndEditing={next}
              onSubmitEditing={next}
              leftIcon={<Icon name="email-outline" size={24} color="grey" />}
            />
            <Input
              ref={passwordRef}
              value={password}
              label="Password"
              secureTextEntry
              placeholder="Password..."
              onChangeText={onPasswordChange}
              returnKeyType="send"
              leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
            />

            <AppButton size={15} label="Sign up" onPress={signup} />
            <AppButton size={15} label="LOGIN" onPress={login} />
          </Card>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
