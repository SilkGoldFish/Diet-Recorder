import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput,Modal, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { InputLine } from '../components';

export default function Login({ navigation }) {

  const login = () => {
    //提交账户密码


      navigation.navigate('Home',{
        userId: 1
      })
    
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Diet Recorder!</Text>

     <InputLine text='username'/>
     <InputLine text='password'/>

      <Button
        title="Login"
        onPress={login}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Text>Don't hava an account? Press to register!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLine: {
    backgroundColor:'white',
    margin:10,
    flexDirection:'row'
  },
  input: {
    borderWidth:1,
    borderColor:'grey'
  }

})