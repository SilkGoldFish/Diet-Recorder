import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddRecord, Profile, Record, Login, Register } from './screens/index';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from './UserContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ route }) => {

  const { userId } = route.params;
  const [user, setUser] = useState({})
  const [data, setData] = useState({})
  const [modalVisible, setModalVisible] = useState(false);

  let date = new Date().toLocaleDateString().split('/')
  date[2] = '20' + date[2]
  date = date[2] + '-' + date[0] + '-' + date[1]

  const getData = async () => {
    fetch('https://sirusw.pythonanywhere.com/api/record/?user_id=' + userId + '&date=' + date)
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getUser = async () => {
    fetch('https://sirusw.pythonanywhere.com/api/profile/' + userId)
      .then((response) => response.json())
      .then((responseJson) => {
        setUser(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUser();
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, data, setData }}>
      <Tab.Navigator>
        <Tab.Screen name="Record" component={Record}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="receipt-long" color={color} size={24} />
            ),
          }} />
        <Tab.Screen
          name="Add"
          component={AddRecord}
          options={{
            tabBarButton: (props, color) => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons
                  name="add"
                  color="#007bff"
                  size={60}
                  style={{
                    position: 'absolute',
                    top: -30,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    strokeWidth: 0.5,
                    padding: 10
                  }}
                  onPress={() => setModalVisible(true)}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" color={color} size={24} />
            ),
          }} />
      </Tab.Navigator>
      <AddRecord modalVisible={modalVisible} setModalVisible={setModalVisible} userId={userId} />
    </UserContext.Provider>
  );
};

export default App;
