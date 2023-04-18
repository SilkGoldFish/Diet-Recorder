import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton, InputLine } from '../components';

export default function Register({ navigation }) {

  function register() {
    alert("Register successfully!")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please fill in the follow information!</Text>
      <InputLine text='username' />
      <InputLine text='password' />
      <InputLine text='password again' />
      <CustomButton title='register' onPress={register} />
      <CustomButton title="Go back" onPress={() => navigation.goBack()} />
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
    fontSize: 15
  }
})