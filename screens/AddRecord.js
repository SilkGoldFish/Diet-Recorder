import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Modal, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import NewRecord from './NewRecord';

const recordURL = 'http://192.168.1.180:8080/accounts/login';
const gptURL = "https://sirusw.pythonanywhere.com/chat/";


const AddRecord = ({ modalVisible, setModalVisible }) => {

  const [recording, setRecording] = useState();
  const [isLoading, setLoading] = useState(false);
  const [reocrd, setRecord] = useState([]);
  const [recordVisible, setRecordVisible] = useState(false);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: '.m4a',
          outputFormat: 2,
          audioEncoder: 3,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        }, ios: {
          extension: '.m4a',
          outputFormat: "aac",
          audioQuality: 127,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    setLoading(true);
    console.log('Stopping recording..');
    await recording.stopAndUnloadAsync();
    /*
    async function uploadAudioAsync(uri) {
      console.log("Uploading " + uri);
      let apiUrl = recordURL;
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
      let formData = new FormData();
      formData.append('file', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/x-${fileType}`,
      });
    
      let options = {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
      console.log("POSTing " + uri + " to " + apiUrl);
      return fetch(apiUrl, options);
    }

    let uri = recording.getURI();
    let response = await uploadAudioAsync(uri);
    let result = await response.json();
    console.log(result)
    
    try {  
      response = await fetch(gptURL, {
      method:'POST',
      body:JSON.stringify(result),
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
      }
      })
      result = await response.json()
      console.log(result)
      const NewRecord = JSON.parse(result.response.choices[0].message.content);
       */
    try {
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
      console.log(NewRecord);

      setRecord(NewRecord);
      setLoading(false);
      setModalVisible(false);
      setRecordVisible(true);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <NewRecord record={reocrd} recordVisible={recordVisible} setRecordVisible={setRecordVisible} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>
              <Button style={styles.button}
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
              />
            </View>
            {isLoading ? <ActivityIndicator /> : null}
            <View style={styles.container}>

              <Button
                style={styles.button}
                title='Hide Modal'
                onPress={() => { setModalVisible(false), setLoading(false) }}
              >
              </Button>
            </View>
          </View>
        </View>

      </Modal>
    </>

  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',

  },
  container: {
    margin: 10,
  },
  button: {
    borderRadius: 10,
  },

});

export default AddRecord;