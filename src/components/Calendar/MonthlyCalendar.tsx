import React from 'react';
import {StyleSheet, View} from 'react-native';
import Cell from './Cell';
import {Calendar} from '../../types/calendar';

interface Props {
  calendar: Calendar;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthlyCalendar = ({calendar, selectedDate, setSelectedDate}: Props) => {
  return (
    <>
      {calendar?.map((week, idx) => (
        <View key={idx} style={styles.row}>
          {week.map(date => (
            <Cell
              key={new Date(date.date).getTime()}
              item={date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ))}
        </View>
      ))}
    </>
  );
};

export default MonthlyCalendar;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
});
