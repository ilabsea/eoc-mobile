import React from 'react'
import { Button, Icon } from 'native-base'

class NavigateComponent extends React.Component {
  navigate() {
    let { item, navigation } = this.props
    navigation.push('Category', { sopGuide: item, id: item.id }) 
  }

  render() {
    return <Button transparent
                  onPress={() => this.navigate() }>
              <Icon type="MaterialIcons" name="arrow-forward" />
            </Button>
  }
}

export default NavigateComponent