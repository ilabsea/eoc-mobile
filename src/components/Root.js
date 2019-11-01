import React from 'react'
import { service } from '../services'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import { showAlert } from '../config/utils'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: ''
    }
  }

  async componentDidMount() {
    this.checkPermission()
    this.createNotificationListeners()
    await service.permissionManager.requestStorage()
    await firebase.analytics().setAnalyticsCollectionEnabled(true)
  }

  checkPermission() {
    firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
        this.getToken();
      } else {
        console.log('user doesn\'t have permission')
        this.requestPermission()
      } 
    });
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken);
        service.apiManager.saveToken(fcmToken)
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      showAlert(title, `onNotify: ${body}`);
      // service.toastManager.show('New notification!')
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      showAlert(title, `onNotifyOpened: ${body}`);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      showAlert(title, `init: ${body}`);
    }

    /*
    * called by #notify_with_key
    */
    this.messageListener = firebase.messaging().onMessage((message) => {
      let { database, navigation } = this.props
      let data = { payload: message._data, navigation, database }
      service.toastManager.show('New notification!', data)
    })

  }

  render() {
    return this.props.children
  }
}

export default Root