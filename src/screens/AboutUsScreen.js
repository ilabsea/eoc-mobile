import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

class AboutUsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>AboutUsScreen</Text>
      </View>
    )
  }
}

AboutUsScreen.navigationOptions = {
  header:null,
  drawerLabel: 'About Us',
  drawerIcon: ({ tintColor }) => (
    <Icon name="md-people" />
  ),
};

export default AboutUsScreen