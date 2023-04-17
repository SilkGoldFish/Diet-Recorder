import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Button, Modal } from "react-native";
import { NewRecordList } from '../components';

const postURL = "https://sirusw.pythonanywhere.com/api/record/"

function NewRecord({ recordVisible, setRecordVisible, record, userId }) {

  let NewRecord = [
    { name: 'aaa', type: 'breakfast', qty: 0, calories: 0, duration: 0 },
    { name: 'bbb', type: 'lunch', qty: 0, calories: 0, duration: 0 },
    { name: 'ccc', type: 'dinner', qty: 0, calories: 0, duration: 0 }]
  const date = new Date();
  const d = date.toLocaleDateString();
  const t = date.toLocaleTimeString();
  for (let i = 0; i < NewRecord.length; i++) {
    NewRecord[i].date = d;
    NewRecord[i].time = t;
    NewRecord[i].user = 1;
    NewRecord[i].quantity = NewRecord[i].qty;
  }
  record = NewRecord;

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

  return (
<Modal
      animationType="fade"
      visible={recordVisible}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.flatListContainer}>
            <NewRecordList data={record} refreshing={false} loadUserData={()=>{}}/>
          </View>
          <View style={styles.container}>
              <Button title={'cancel'} onPress={cancel} />
              <Button title={'submit'} onPress={submit} />
          </View>
        </View>
      </View>
    </Modal>
    
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height:'90%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  flatListContainer: {
    flex:1
  },
  container: {
    padding: 30,
    justifyContent: 'center'
  },
});

export default NewRecord;