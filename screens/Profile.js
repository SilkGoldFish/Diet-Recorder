import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const placesURL = "https://sirusw.pythonanywhere.com/api/profile/1";
export default function Record() {
  const [isLoading, setLoading] = useState(true);
  const [places, setPlaces] = useState({});

  const getPlaces = async () => {
    try {
      const response = await fetch(placesURL);
      const result = await response.json();
      const newPlaces = result;
      setPlaces(newPlaces);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> Searching places.... </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>

      <Text style={styles.text}>First Name: {places.firstname}</Text>
      <Text style={styles.text}>Last Name: {places.lastname}</Text>
      <Text style={styles.text}>Date of Birth: {places.date_of_birth}</Text>
      <Text style={styles.text}>Gender: {places.gender}</Text>
      <Text style={styles.text}>Weight: {places.weight}</Text>
      <Text style={styles.text}>Height: {places.height}</Text>
      <Text style={styles.text}>Weight Goal: {places.weight_goal}</Text>
      <Button title='edit profile' />
      <Button title='log out' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  text: {
    fontSize: 20
  }
});