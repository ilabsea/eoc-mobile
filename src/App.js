import React from 'react';
import { YellowBox } from 'react-native';
import { Icon } from 'native-base'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './screens/HomeScreen';
import SopDetailScreen from './screens/SopDetailScreen';
import DownloadScreen from './screens/DownloadScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import NotificationScreen from './screens/NotificationScreen'

YellowBox.ignoreWarnings(['Warning'])

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  SopDetail: SopDetailScreen,
})

const DrawNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-home" />
      ),
    }
  },
  Download: {
    screen: DownloadScreen,
    navigationOptions: {
      drawerLabel: 'Downloads',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-download" />
      ),
    }
  },
  Notifications: {
    screen: NotificationScreen,
    navigationOptions: {
      drawerLabel: 'Notifications',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-notifications" />
      ),
    }
  },
  AboutUs: {
    screen: AboutUsScreen,
    navigationOptions: {
      drawerLabel: 'About us',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-people" />
      ),
    }
  },
}, {
  drawerPosition: 'left'
});

const App = createAppContainer(DrawNavigator);

export default App;
