import {StyleSheet, View} from 'react-native';
import React from 'react';
import Calendar from '../components/Calendar/Calendar';

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <Calendar />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
