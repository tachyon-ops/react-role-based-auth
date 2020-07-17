import React, { useContext, useState } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from 'react-native-elements';
import { AuthContext } from 'react-rb-auth';
import { Icon } from 'react-native-vector-icons/Icon';
import { AppButton } from '../../../ui/AppButton';
import { StyleContext } from '../../../services/StyleService';
import { Screen } from '../../../ui/Screen';

// TODO: https://github.com/spencercarli/react-navigation-auth-flow/blob/finished-code/app/screens/SignUp.js

export const SignupScreen = () => {
  const nav = useNavigation();

  const style = useContext(StyleContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'red',
      borderWidth: 10,
      borderStyle: 'solid',
      padding: 100,
    },
  });

  const auth = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  /**
   * Signup
   */
  const validate = () => {
    if (email === '') {
      setEmailError('You must set email');
      return false;
    }
    if (password === '') {
      setPasswordError('You must set a password');
      return false;
    }
    if (passwordConfirm === '') {
      setPasswordConfirmError('You must set a password');
      return false;
    }
    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
      setPasswordConfirmError('Passwords do not match');
      return false;
    }
    return true;
  };
  const onSuccess = () => nav.navigate('Login');
  const onFailure = () => console.log('Signup failed');
  const submit = () => {
    if (validate()) auth.logic.signup().then(onSuccess).catch(onFailure);
  };

  const login = () => nav.navigate('Login');
  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <Card
              title="SignUp"
              titleStyle={style.typography.title}
              containerStyle={{ paddingVertical: 20, minWidth: 350 }}
            >
              <Input
                label="Email"
                placeholder="Email address..."
                value={email}
                onChangeText={setEmail}
                errorMessage={emailError}
              />
              <Input
                label="Password"
                secureTextEntry
                placeholder="Password..."
                value={password}
                onChangeText={setPassword}
                errorMessage={passwordError}
              />
              <Input
                label="Confirm Password"
                secureTextEntry
                placeholder="Confirm Password..."
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                errorMessage={passwordConfirmError}
              />

              <Text>HERE</Text>
              <AppButton size={15} label="Sign up" onPress={submit} />
              <AppButton size={15} label="Login" onPress={login} />
            </Card>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};
