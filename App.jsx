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
import Verify from './src/views/Auth/Register/Verify';
import Profile from './src/views/Auth/Register/Profile';
import Location from './src/views/Auth/Register/Location';
import RootProvider from './src/context';
import CompleteProfile from './src/views/Auth/Register/CompleteProfile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/views/Home/Home';
import RootNavigation from './src/Navigation/RootNavigation';

function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.gray}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
        <RootProvider>
          <RootNavigation />
        </RootProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
