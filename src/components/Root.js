import React from 'react';
import {service} from '../services';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import bgMessaging from './bgMessaging';
import Toast from 'react-native-root-toast';
import Reactotron from 'reactotron-react-native';
import {connect} from 'react-redux';
import i18n from 'i18n-js';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.toaster = null;
  }
  async componentDidMount() {
    SplashScreen.hide();
    this.checkPermission();
    this.createNotificationListeners();
    await service.permissionManager.requestStorage();
    await firebase.crashlytics().enableCrashlyticsCollection();
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
  }

  toast(isConnected) {
    if (!isConnected) {
      if (!this.toaster) {
        this.toaster = Toast.show(i18n.t('noInternet'), {
          duration: -1,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    } else {
      if (this.toaster) {
        Toast.show(i18n.t('online'));
        Toast.hide(this.toaster);
        this.toaster = null;
      }
    }
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
    // FIXME: maybe isConnected is being cache
    const {isConnected} = this.props;
    this.toast(isConnected);
    return this.props.children;
  }
}

const mapStateToProps = ({net}) => ({
  isConnected: net.isConnected,
});

export default connect(mapStateToProps)(withNavigation(Root));
