import React from 'react'
import { Button, Icon } from 'native-base'
import { service } from '../services'
import { withNavigation } from 'react-navigation'

class NavigateComponent extends React.Component {
  navigate() {
    let { item, navigation } = this.props
    navigation.push('Category', { sopGuide: item }) 
    service.firebaseManager.logEvent('EVENT_NAVIGATE', { id: item.id })
  }

  render() {
    return <Button transparent
                  onPress={() => this.navigate() }>
              <Icon type="MaterialIcons" name="arrow-forward" />
            </Button>
  }
}

export default withNavigation(NavigateComponent)