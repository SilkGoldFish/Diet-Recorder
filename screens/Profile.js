import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { CustomButton, Person, Update } from '../components/index'

export default function Profile({ navigation }) {
  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <View style={styles.container}>
      <Update setShowUpdate={setShowUpdate} showUpdate={showUpdate} />
      <Person />
      <CustomButton title='edit profile' onPress={() => { setShowUpdate(true) }} />
      <CustomButton title='log out' onPress={() => { alert("Log out successfully!"); navigation.navigate('Login') }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    flex: 1
  }
});