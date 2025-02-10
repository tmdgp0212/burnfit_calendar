import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CalendarType} from '../../types/calendar';
import Animated, {runOnJS} from 'react-native-reanimated';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

interface Props {
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
}

const WeeklyCalendar = ({setCalendarType}: Props) => {
  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd(e => {
      runOnJS(setCalendarType)('monthly');
    });

  return (
    <GestureDetector gesture={flingDown}>
      <Animated.View>
        <Text>WeeklyCalendar</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({});
