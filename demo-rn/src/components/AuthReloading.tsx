import React, { useEffect, createRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView, { AnimatedLottieView } from 'lottie-react-native';

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export const AuthReloading: React.FC = () => {
  const asset = '../assets/23315-office-yoga.json';
  const animation = createRef<AnimatedLottieView>();

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={animation}
        style={{
          height: 300,
          backgroundColor: '#fff',
        }}
        source={require(asset)}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>App loading...</Text>
      </View>
    </View>
  );
};

export const AuthLoading: React.FC = () => {
  const asset = '../assets/23315-office-yoga.json';
  const animation = createRef<AnimatedLottieView>();

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, []);

  return (
    <View
      style={{
        ...styles.animationContainer,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        zIndex: 1000,
      }}
    >
      <LottieView
        ref={animation}
        style={{
          height: 300,
          backgroundColor: '#fff',
        }}
        source={require(asset)}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Auth reloading...</Text>
      </View>
    </View>
  );
};
