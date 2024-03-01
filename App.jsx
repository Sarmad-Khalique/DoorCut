/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from './src/theme';
import RootProvider from './src/context';

import RootNavigation from './src/Navigation/RootNavigation';

function App() {
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
