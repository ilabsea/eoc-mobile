// @flow
import firebase from 'react-native-firebase';
import {Sop} from '../services';

export default async message => {
  if (message) {
    const {
      data: {itemId, title, body},
    } = message;
    const response = await Sop.find(itemId);
    const {id, name, description} = response.data;

    const notification = new firebase.notifications.Notification({
      sound: 'default',
      show_in_foreground: true,
    })
      .setNotificationId(`_instedd_ilab_eoc_${id}`)
      .setTitle(title || name)
      .setBody(body || description)
      .setData({itemId: id})
      .setSound('notif');

    notification.android
      .setChannelId('eoc-channel')
      .android.setSmallIcon('ic_stat_notif')
      .android.setColor('#000000')
      .android.setPriority(firebase.notifications.Android.Priority.Max);

    firebase
      .notifications()
      .displayNotification(notification)
      .catch(err => console.error(err));

    return Promise.resolve();
  }
};
