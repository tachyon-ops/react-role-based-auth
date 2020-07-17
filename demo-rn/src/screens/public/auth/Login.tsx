import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppButton } from '../../../ui/AppButton';
import { StyleContext } from '../../../services/StyleService';
import { Screen } from '../../../ui/Screen';
import { AppAuthContext } from '../../../services/AppAuthContext';

export const LoginScreen: React.FC = () => {
  const emailRef = React.createRef<Input>();
  const passwordRef = React.createRef<Input>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigation();
  const auth = useContext(AppAuthContext);
  const style = useContext(StyleContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const onEmailChange = (text: string) => setEmail(text);
  const onPasswordChange = (text: string) => setPassword(text);
  const next = () => setTimeout(() => passwordRef.current.focus(), 100);

  useEffect(() => {
    // emailRef.current.focus();
  }, []);

  const signup = () => nav.navigate('Signup');

  const onSuccess = (res) => {
    console.log('onSuccess res', res);
    // nav.navigate('Admin/Dashboard');
  };
  const onFailure = (err) => {
    console.log('onFailure err', err);
  };
  const login = () =>
    auth.logic.login(email, password).then(onSuccess).catch(onFailure);

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <Card
              title="Login"
              titleStyle={style.typography.title}
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
              <AppButton size={15} label="Login" onPress={login} />
            </Card>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};
