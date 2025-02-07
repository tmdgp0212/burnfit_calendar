import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParams} from '../types/roots';
import {
  CalendarScreen,
  HomeScreen,
  LibraryScreen,
  MypageScreen,
} from '../screens';

const Tab = createBottomTabNavigator<RootTabParams>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Mypage" component={MypageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
