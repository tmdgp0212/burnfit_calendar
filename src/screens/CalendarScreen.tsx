import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CalendarScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>CalendarScreen</Text>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
