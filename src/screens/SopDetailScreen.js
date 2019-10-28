import React from 'react'
import { View, Text } from 'react-native'

class SopDetailScreen extends React.Component {
  render() {
    let { item } = this.props.navigation.getParam('item')

    return <View>
      <Text>{item.name}</Text>
    </View>
  }
}

export default SopDetailScreen