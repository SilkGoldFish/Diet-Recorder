import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text,TextInput, View, Modal, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { InputLine } from '../components';

export default function Register({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Please fill in the follow information!</Text>
      <InputLine text='username'/>
      <InputLine text='password'/>
      <InputLine text='password'/>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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