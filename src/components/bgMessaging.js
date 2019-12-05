// @flow
import firebase from 'react-native-firebase';

export default async (message) => {
  if( message ) {
    const { data } = message
    let item = JSON.parse(data.item)

    const notification = new firebase.notifications.Notification({
                              sound: 'default',
                              show_in_foreground: true,
                            })
                            .setNotificationId(`_instedd_ilab_eoc_${item.id}`)
                            .setTitle(item.name)
                            .setBody(item.description)
                            .setData({ item: data.item })
                            .setSound('notif')

    notification
      .android.setChannelId('eoc-channel')
      .android.setSmallIcon('ic_stat_notif')
      .android.setColor('#000000')
      .android.setPriority(firebase.notifications.Android.Priority.High)

    firebase.notifications()
      .displayNotification(notification)
      .catch(err => console.error(err))
  }
}