import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {Home} from './Home';
import {HistoryPage} from './HistoryPAge';

const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        labelPosition: 'below-icon',
        style: {
          backgroundColor: '#eb3b5a',
          padding: 10,
        },
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: (focused) => (
            <Entypo
              name="home"
              style={{
                fontSize: 16,
                color: focused.color,
              }}
            />
          ),

          title: (focused) => (
            <Text
              style={{
                fontSize: 14,
                textTransform: 'capitalize',
                color: focused.color,
                marginBottom: 6,
              }}>
              home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="prevhistory"
        component={HistoryPage}
        options={{
          tabBarIcon: (focused) => (
            <Fontisto
              name="history"
              style={{
                fontSize: 14,
                color: focused.color,
              }}
            />
          ),
          tabBarLabel: (focused) => (
            <Text
              style={{
                fontSize: 14,
                textTransform: 'capitalize',
                color: focused.color,
                marginBottom: 6,
              }}>
              history
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
  },
});
