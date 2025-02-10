import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  CalendarScreen,
  HomeScreen,
  LibraryScreen,
  MypageScreen,
} from '../screens';

import {RootTabParams} from '../types/roots';

const Tab = createBottomTabNavigator<RootTabParams>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="calendar" size={18} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="th-large" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Mypage"
          component={MypageScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="user" size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
