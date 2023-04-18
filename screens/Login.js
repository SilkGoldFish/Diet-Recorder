import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton, InputLine } from '../components';

export default function Login({ navigation }) {

  const login = () => {
    //提交账户密码

    navigation.navigate('Home', {
      userId: 1
    })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Diet Recorder!</Text>
      <InputLine text='username' />
      <InputLine text='password' />
      <CustomButton title="Login" onPress={login} />
      <CustomButton title="Register" onPress={() => navigation.navigate('Register')} />
      <Text>Don't have an account? Press to register!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 200,
    borderRadius: 40
  },
  title: {
    marginBottom: 20,
    fontSize: 20
  }
})