/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/providers/Navigation';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaView>
  );
}

export default App;
