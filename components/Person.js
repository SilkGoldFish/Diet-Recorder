import React, { useState, useEffect } from 'react';
import { Button, Image,StyleSheet, Text, View, Modal, Pressable, ActivityIndicator, FlatList } from 'react-native';


export default function Person({data}) {
    return (

      <View style={styles.container}>
<Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://i.redd.it/v7k1yoflgpl61.jpg',
        }}
      />
<Text style={styles.text}>First Name: {data.firstname}</Text>
<Text style={styles.text}>Last Name: {data.lastname}</Text>
<Text style={styles.text}>Date of Birth: {data.date_of_birth}</Text>
<Text style={styles.text}>Gender: {data.gender}</Text>
<Text style={styles.text}>Age: {data.age}</Text>
<Text style={styles.text}>Weight: {data.weight}</Text>
<Text style={styles.text}>Height: {data.height}</Text>
<Text style={styles.text}>Weight Goal: {data.weight_goal}</Text>
</View>
        );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 200,
        height: 200,
        marginBottom:50
      },
      container: {
        flex:3,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        margin:20
      }
}

)