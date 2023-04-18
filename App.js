import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddRecord, Profile, Record, Login, Register } from './screens/index';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Record" component={Record} initialParams={{ userId: userId }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="receipt-long" color={color} size={24
              } />
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
        <Tab.Screen name="Profile" component={Profile} initialParams={{ userId: userId }} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={24} />
          ),
        }} />
      </Tab.Navigator>
      <AddRecord modalVisible={modalVisible} setModalVisible={setModalVisible} userId={userId} />
    </>
  );
};

export default App;

