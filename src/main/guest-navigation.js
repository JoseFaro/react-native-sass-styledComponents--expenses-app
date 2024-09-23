import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/login';

const Stack = createNativeStackNavigator();

function GuestNavigation() {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen component={LoginScreen} name="Login" options={{ headerShown: false }} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default GuestNavigation;
