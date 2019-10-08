import React from 'react';
import { Text, StyleSheet, Button, Image, YellowBox } from 'react-native';
import { Icon } from 'native-base'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './screens/HomeScreen';
import SopDetailScreen from './screens/SopDetailScreen';
import DownloadScreen from './screens/DownloadScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import NotificationScreen from './screens/NotificationScreen'

YellowBox.ignoreWarnings(['Warning'])

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    SopDetail: SopDetailScreen,
  },
  {
    initialRouteName: 'Home',
  },
);


class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-notifications" />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Download: DownloadScreen,
  Notifications: NotificationScreen,
  AboutUs: AboutUsScreen,
}, {
  drawerPosition: 'left'
});

// const App = createAppContainer(AppNavigator);
const App = createAppContainer(MyDrawerNavigator);

export default App;
