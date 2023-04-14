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

const Record = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    fetch('https://sirusw.pythonanywhere.com/api/record')
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

  const ItemView = ({ item }) => {

    return (
      <View>
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
    <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        enableEmptySections={true}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 5,
  },
});

export default Record;
