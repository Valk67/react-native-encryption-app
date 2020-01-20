import React from 'react'
import { View, Text, Dimensions, AsyncStorage, StyleSheet } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Dashboard from './Dashboard';
import SettingsScreen from './SettingsScreen';
import PasswordsScreen from './PasswordsScreen';
import ImagesScreen from './ImagesScreen';
import PostImageScreen from './PostImageScreen';


export const TabScreen = createMaterialBottomTabNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarLabel: 'Home', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-home" color={tintColor} size={25} />
            )
        }
    }, 
    PasswordsScreen: {
        screen: PasswordsScreen, 
        navigationOptions: {
            tabBarLabel: 'Passwords', 
            tabBarIcon: ({ tintColor }) => (
                <SimpleLineIcons name="key" color={tintColor} size={20} />
            )
            
        }
    },
    ImagesScreen: {
        screen: ImagesScreen, 
        navigationOptions: {
            tabBarLabel: 'Images', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-images" color={tintColor} size={25} />
            )
        }
    }
    // SettingsScreen: {
    //     screen: SettingsScreen, 
    //     navigationOptions: {
    //         tabBarLabel: 'Settings', 
    //         tabBarIcon: ({ tintColor }) => (
    //             <Ionicons name="ios-settings" color={tintColor} size={25} />
    //         )
    //     }
    // }
}, {
   initialRouteName: 'Dashboard',
   activeColor: 'white',
   barStyle: { backgroundColor: 'black' },
   lableStyle: { fontSize: 16 },
   inactiveColor: 'grey',

},
{
    tabBarOptions: {
        // activeTintColor: 'red', 
        // activeBackgroundColor: 'grey',
        // inactiveTintColor: 'black',
        // inactiveTintColor: 'grey',
        // labelStyle: {
        //   fontSize: 16,
          
        // },
        // // tabStyle: {
        // //     padding: -50, margin:0,   //Padding 0 here
        // // },
        // showIcon: true
    }
});

// https://reactnavigation.org/docs/en/1.x/tab-navigator.html



