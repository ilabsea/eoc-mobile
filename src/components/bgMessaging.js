// @flow
import firebase from 'react-native-firebase';

export default async (message) => {
    
  if( message ) {
    const { data } = message
    let item = JSON.parse(data.item)

    const notification = new firebase.notifications.Notification()
                            .setNotificationId(`_instedd_ilab_eoc_${item.id}`)
                            .setTitle(item.name)
                            .setBody(item.description)
                            .setData({ item: data.item });

    notification
      .android.setChannelId('eoc-channel')

    firebase.notifications().displayNotification(notification)
  }
}