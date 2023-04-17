import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { RecordList, Search, Calorie } from '../components';

const Record = ({ route }) => {

  const userId = route.params.userId;

  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);


  let d = new Date().toLocaleDateString().split('/')
  d[2] = '20' + d[2]
  d = d[2] + '-' + d[0] + '-' + d[1]
  const [date, setDate] = useState(d)

  useEffect(() => {
    loadUserData();
  }, [date]);

  const loadUserData = () => {
    setRefreshing(true);
    console.log(date)
    fetch('https://sirusw.pythonanywhere.com/api/record/?user_id=' + userId + '&date=' + date)
      .then((response) => response.json())
      .then((responseJson) => {
        setRefreshing(false);
        const newdata = responseJson;
        console.log(newdata)
        setUserData(newdata);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <Search date={date} setDate={setDate} loadUserData={loadUserData} />
      <Calorie data={userData} userId={userId} />
      <RecordList data={userData} refreshing={refreshing} loadUserData={loadUserData} />
    </SafeAreaView>
  );
};

export default Record;
