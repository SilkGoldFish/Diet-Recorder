import React, { useState, useEffect } from 'react';
import {
  SafeAreaView
} from 'react-native';
import { RecordList, Search, Calorie } from '../components';

const Record = ({ route }) => {

  const userId = route.params.userId;

  let d = new Date().toLocaleDateString().split('/')
  d[2] = '20' + d[2]
  d = d[2] + '-' + d[0] + '-' + d[1]

  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);
  const [date, setDate] = useState(d)

  useEffect(() => {
    loadUserData();
  }, [date]);

  const loadUserData = () => {
    setRefreshing(true);
    fetch('https://sirusw.pythonanywhere.com/api/record/?user_id=' + userId + '&date=' + date)
      .then((response) => response.json())
      .then((responseJson) => {
        setRefreshing(false);
        const newdata = responseJson;
        setUserData(newdata);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <Search date={date} setDate={setDate} />
      <Calorie data={userData} userId={userId} />
      <RecordList data={userData} refreshing={refreshing} loadUserData={loadUserData} />
    </SafeAreaView>
  );
};

export default Record;
