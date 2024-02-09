/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import OnboaridngScreen from './src/views/Onboarding/OnbaoridngScreen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from './src/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/views/Auth/Login/Login';
import Register from './src/views/Auth/Register/Register';

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.gray}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Onboarding" component={OnboaridngScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
