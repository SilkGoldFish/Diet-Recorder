import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text,TextInput, View, Modal, Pressable, ActivityIndicator, FlatList } from 'react-native';


export default function InputLine({text}) {
    return (
        <View style={styles.inputLine}>
          <Text>{text}</Text>
          <TextInput style={styles.input}/>
        </View>
      )
}

const styles = StyleSheet.create({
    inputLine: {
        flexDirection:'row'
    },
    input: {
        borderWidth:1
    }
})