import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { CustomButton, InputLine } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Register({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  async function register() {
    if (username == '' || password == '') {
      alert('Username or password can\'t be empty!')
      return;
    }
    if (password != passwordAgain) {
      alert('Please input the same password twice!')
      return;
    }
    setLoading(true)

    try {
      const response = await fetch('https://sirusw.pythonanywhere.com/api/profile/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      setLoading(false)
      const data = await response.json();
      if (response.ok) {
        alert('Register successfully!')
        setLoading(false)
        setUsername('')
        setPassword('')
        setPasswordAgain('')
      } else {
        alert(data.message + '!')
      }
    } catch (error) {
      setLoading(false)
      console.error('Profile creation error:', error);
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Please fill in the following information!</Text>
        <InputLine text='username' value={username} onChange={(text) => setUsername(text)} />
        <InputLine text='password' value={password} onChange={(text) => setPassword(text)} secureTextEntry={true} />
        <InputLine text='password again' value={passwordAgain} onChange={(text) => setPasswordAgain(text)} secureTextEntry={true} />
        {loading ? <ActivityIndicator /> : null}
        <CustomButton title='register' onPress={register} />
        <CustomButton title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </KeyboardAwareScrollView>
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
    borderRadius: 40,
    padding: 30
  },
  title: {
    marginBottom: 20,
    fontSize: 15
  }
})