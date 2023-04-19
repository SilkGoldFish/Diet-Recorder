import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { CustomButton, InputLine } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login({ navigation }) {

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    if (username == '' || password == '') {
      alert('Username or password can\'t be empty!')
      return;
    }
    setLoading(true)

    try {
      const response = await fetch('https://sirusw.pythonanywhere.com/api/profile/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      setLoading(false)
      if (response.ok) {
        console.log('Login successful:', data);
        navigation.navigate('Home', {
          userId: data.user_id
        })
      } else {
        alert(data.message + '!')
      }
    } catch (error) {
      setLoading(false)
      console.error('Login error:', error);
    }
  }

  return (
    <KeyboardAwareScrollView >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Diet Recorder!</Text>
        <InputLine text='username' value={username} onChange={(text) => setUsername(text)} />
        <InputLine text='password' value={password} onChange={(text) => setPassword(text)} secureTextEntry={true} />
        {loading ? <ActivityIndicator /> : null}
        <CustomButton title="Login" onPress={login} />
        <CustomButton title="Register" onPress={() => navigation.navigate('Register')} />
        <Text style={styles.footer}>Don't have an account? Press to register!</Text>
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
    fontSize: 20
  },
  footer: {
    color: 'blue'
  }
})