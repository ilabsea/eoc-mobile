import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';

class NotificationScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>NotificationScreen</Text>
      </View>
    );
  }
}

NotificationScreen.navigationOptions = {
  header: null,
  drawerLabel: 'Notification',
  drawerIcon: ({tintColor}) => <Icon name="md-notifications" />,
};

export default NotificationScreen;
