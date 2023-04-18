import React, { useState } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import NewRecord from './NewRecord';
import { CustomButton } from '../components';

const recordURL = 'http://192.168.1.180:8080/accounts/audio';
const gptURL = "https://sirusw.pythonanywhere.com/chat/";

const AddRecord = ({ modalVisible, setModalVisible, userId }) => {

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
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      result = await response.json()
      const newRecord = JSON.parse(result.response.choices[0].message.content);
      
      setRecord(newRecord);
      setLoading(false);
      setModalVisible(false);
      setRecordVisible(true);

    } catch (error) {
      setLoading(false);
      alert("The server is busy. Please try again!");
    }
  }


  return (
    <>
      <NewRecord record={reocrd} recordVisible={recordVisible} setRecordVisible={setRecordVisible} userId={userId} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.shadow]}>
            <CustomButton title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
            {isLoading ? <ActivityIndicator /> : null}
            <CustomButton title='Cancel' onPress={() => { setModalVisible(false), setLoading(false) }} />
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

export default AddRecord;