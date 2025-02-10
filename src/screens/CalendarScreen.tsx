import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Calendar from '../components/Calendar/Calendar';

const CalendarScreen = () => {
  return (
    <View style={styles.screen}>
      <Calendar />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
