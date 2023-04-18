import React from 'react';
import { StyleSheet, View, Modal } from "react-native";
import { NewRecordList } from '../components';
import { CustomButton } from '../components';

function NewRecord({ recordVisible, setRecordVisible, record, userId }) {

  let newRecord = JSON.parse(JSON.stringify(record))

  const date = new Date();
  let d = new Date().toLocaleDateString().split('/')
  d[2] = '20' + d[2]
  d = d[2] + '-' + d[0] + '-' + d[1]

  const t = date.toLocaleTimeString();
  for (let i = 0; i < newRecord.length; i++) {
    newRecord[i].type = newRecord[i].type.toLowerCase();
    newRecord[i].date = d;
    newRecord[i].time = t;
    newRecord[i].user = userId;
    newRecord[i].quantity = newRecord[i].qty;
  }

  function cancel() {
    setRecordVisible(false)
  }

  const submit = () => {
    console.log(newRecord)
    let postURL = "https://sirusw.pythonanywhere.com/api/record/";
    if (newRecord.length > 1) {
      postURL += 'create_multiple/';
      newRecord = { "records": newRecord }
    } else {
      newRecord = newRecord[0];
    }

    fetch(postURL, {
      method: 'POST',
      body: JSON.stringify(newRecord),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setRecordVisible(false)
        alert("Submit successfully!")
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      animationType="fade"
      visible={recordVisible}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, styles.shadow]}>
          <NewRecordList data={newRecord} />
          <CustomButton title='cancel' onPress={cancel} />
          <CustomButton title='submit' onPress={submit} />
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
    height: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '80%',
    borderRadius: 20
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});

export default NewRecord;