import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { CustomButton, Person, Update } from '../components/index'

export default function Profile({ navigation, route }) {

  const userId = route.params.userId;

  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  const getProfile = async () => {
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
    getProfile();
  }, []);

  return (
    <>
      <Update data={profile} setShowUpdate={setShowUpdate} showUpdate={showUpdate} setData={setProfile} />
      {isLoading ? <ActivityIndicator /> : <><Person data={profile} /></>}
      <View style={styles.container}>
        <CustomButton title='edit profile' onPress={() => { setShowUpdate(true) }} />
        <CustomButton title='log out' onPress={() => { alert("Log out successfully!"); navigation.navigate('Login') }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25
  }
});