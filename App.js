import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddRecord, Profile, Record } from './screens/index';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <NavigationContainer>

      <Tab.Navigator>
        <Tab.Screen name="Record" component={Record}
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
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={24} />
          ),
        }} />
      </Tab.Navigator>
      <AddRecord modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </NavigationContainer>

  );
};

export default App;

