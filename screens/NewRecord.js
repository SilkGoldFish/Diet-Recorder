import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Button, Modal } from "react-native";

const postURL = "https://sirusw.pythonanywhere.com/api/record/"

function NewRecord({ recordVisible, setRecordVisible, record }) {

  function cancel() {
    setRecordVisible(false)
  }

  async function submit() {
    setRecordVisible(false)
    //post request to add the record
    let response = await fetch(postURL, {
      method: 'POST',
      body: JSON.stringify(record),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    let result = await response.json()
    console.log(result);
  }

  const ItemView = ({ item }) => {

    return (
      <View style={styles.item}>
        <Text style={styles.text}>Name: {item.name}</Text>
        <Text style={styles.text}>Date: {item.date}</Text>
        <Text style={styles.text}>Time: {item.time}</Text>
        <Text style={styles.text}>Type: {item.type}</Text>
        <Text style={styles.text}>Calories: {item.calories}</Text>
        <Text style={styles.text}>Quantity: {item.quantity}</Text>
        <Text style={styles.text}>Duration: {item.duration}</Text>
      </View>

    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <Modal
      animationType="fade"
      visible={recordVisible}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.flatListContainer}>
            <FlatList
              data={record}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              enableEmptySections={true}
              renderItem={ItemView}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button style={styles.button} title={'cancel'} onPress={cancel} />
            </View>
            <View style={styles.buttonContainer}>
              <Button style={styles.button} title={'submit'} onPress={submit} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: '70%',
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  flatListContainer: {
    height: '80%'
  },
  button: {

  },
  container: {
    height: '20%',
    padding: 20,
    justifyContent:'center'
  },
  buttonContainer: {
    margin: 10,
  },
  item: {
    margin: 10,
  },
  text: {
    fontSize: 15,
    padding: 2,
  },
});

export default NewRecord;