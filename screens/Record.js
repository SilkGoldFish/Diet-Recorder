import React from 'react';
import { View } from 'react-native';
import { RecordList, Search, Calorie } from '../components';

const Record = () => {
  return (
    <View>
      <Search />
      <Calorie />
      <RecordList />
    </View>
  );
};

export default Record;
