// @flow
import firebase from 'react-native-firebase';

export default async (message) => {
    
    console.log('message', message)

    
    // handle your message
    // console.log('remote message: ', message)
    if( message ) {
        const { data } = message
        let item = JSON.parse(data.item)

        const notification = new firebase.notifications.Notification()
        .setNotificationId(`_notify_eoc_${item.id}`)
        .setTitle(item.name)
        .setBody(item.description)
        .setData({ item: data.item });

        notification
            .android.setChannelId('test-channel')
            // .android.setSmallIcon('ic_launcher');

        firebase.notifications().displayNotification(notification)

        // console.log('inner remote message: ', item, this.props)
        // this.props.navigation.navigate("SopDetail", { item })
      }

    // return Promise.resolve();
}