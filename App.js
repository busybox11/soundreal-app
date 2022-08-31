import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/Home';
import { SendScreen } from './screens/Send';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Send" component={SendScreen} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}