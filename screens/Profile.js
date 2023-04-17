import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Button, Modal } from "react-native";
import { Person, Update } from '../components/index'

export default function Profile({ navigation, route }) {

  const userId = route.params.userId;

  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  const getPlaces = async () => {
    fetch('https://sirusw.pythonanywhere.com/api/profile/' + userId)
      .then((response) => response.json())
      .then((responseJson) => {
        const newdata = responseJson;
        setLoading(false)

        setProfile(newdata)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <>
      {isLoading ? <ActivityIndicator /> : <>
        <Person data={profile} />
        <Update setShowUpdate={setShowUpdate} showUpdate={showUpdate} /></>
      }
      <View style={styles.buttonContainer}>
        <Button title='edit profile' onPress={() => { setShowUpdate(true) }} />
        <Button title='log out' onPress={() => navigation.navigate('Login')} />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1
  }
});