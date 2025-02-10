import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Calendar} from '../../types/calendar';
import Cell from './Cell';

interface Props {
  calendar: Calendar | undefined;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Rows = ({calendar, selectedDate, setSelectedDate}: Props) => {
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

export default Rows;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
});
