import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

class DownloadScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>DownloadScreen</Text>
      </View>
    )
  }
}

DownloadScreen.navigationOptions = {
  header:null,
  drawerLabel: 'Download',
  drawerIcon: ({ tintColor }) => (
    <Icon name="md-download" />
  ),
};

export default DownloadScreen