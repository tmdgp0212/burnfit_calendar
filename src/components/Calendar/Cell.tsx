import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {dateComparer} from '../../util/dateComparer';
import {Day} from '../../types/calendar';

interface Props {
  item: Day;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Cell = ({item, selectedDate, setSelectedDate, setCurrentDate}: Props) => {
  const isToday = dateComparer(item.date, new Date()).isSameDate;
  const isSelected = dateComparer(item.date, selectedDate).isSameDate;

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedDate(item.date);
        setCurrentDate(item.date);
      }}
      style={[styles.cellContainer]}>
      <View
        style={[
          styles.round,
          isToday && styles.today,
          isSelected && styles.selected,
        ]}>
        <Text
          style={[
            isSelected && styles.selected_text,
            !item.isInCurrentMonth && styles.inactive,
          ]}>
          {item.day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Cell;

const styles = StyleSheet.create({
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  today: {
    borderWidth: 1,
    borderColor: '#232B99',
  },
  selected: {
    backgroundColor: '#AAAEEB',
  },
  selected_text: {
    color: 'white',
  },
  inactive: {
    color: '#989898',
  },
});
