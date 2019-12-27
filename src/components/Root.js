import React from 'react';
import {service} from '../services';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import bgMessaging from './bgMessaging';

class Root extends React.Component {
  async componentDidMount() {
    SplashScreen.hide();
    this.checkPermission();
    this.createNotificationListeners();
    await service.permissionManager.requestStorage();
    await firebase.crashlytics().enableCrashlyticsCollection();
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
  }

  checkPermission() {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.getToken();
        } else {
          this.requestPermission();
        }
      });
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        service.apiManager.saveToken(fcmToken);

        const channel = new firebase.notifications.Android.Channel(
          'eoc-channel',
          'EOC Channel',
          firebase.notifications.Android.Priority.Max,
        )
          .setDescription('ilabsoutheastasia.org/eoc')
          .setSound('notif');

        firebase.notifications().android.createChannel(channel);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (e) {
      service.toastManager.show(e);
    }
  }

  componentWillUnmount() {
    this.removeMessageListener();
    this.removeNotificationListener();
    this.removeNotificationOpenedListener();
  }

  handleDetailNavigate(listener) {
    if (listener) {
      const {data} = listener.notification;
      let itemId = data.itemId;
      this.props.navigation.navigate('SopDetail', {itemId});
    }
  }

  createNotificationListeners() {
    /*
     * app is in foreground
     * */
    this.removeNotificationListener = firebase
      .notifications()
      .onNotification(notification => {
        bgMessaging(notification);
      });

    /*
     * app is in background
     * */
    this.removeNotificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        this.handleDetailNavigate(notificationOpen);
      });

    /*
     * subscribe to a topic
     * */
    this.removeMessageListener = firebase
      .messaging()
      .onMessage(notification => {
        bgMessaging(notification);
      });

    /*
     * app is closed
     * */
    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationInitial => {
        this.handleDetailNavigate(notificationInitial);
      });
  }

  render() {
    return this.props.children;
  }
}

export default withNavigation(Root);
