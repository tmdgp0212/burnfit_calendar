import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MypageScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>MypageScreen</Text>
    </View>
  );
};

export default MypageScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
