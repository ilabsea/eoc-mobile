import React from 'react'
import styleUtils from '../config/styles'
import moment from 'moment'
import { View, Text } from 'react-native'
import { Button, Left, H3,
  Right, Body, Icon, ListItem } from 'native-base'
import * as config from '../config/connectionBase'
import { service } from '../services'
import { basename } from '../config/utils'

class ListComponent extends React.Component {

  constructor(props) {
    super(props)

  }
  
  init = {
    navigate: () => this.handleNavigation(),
    download: () => this.handleDownload()
  }

  handleDownload = () => {
    let { item } = this.props

    let remoteURL = `${config.host.staging}:${config.port}${item.file.url}`
    let filename = basename(remoteURL)
    console.log(remoteURL, filename)

    service.downloadManager.download( remoteURL, filename )
    service.toastManager.show(`Downloaded completed!`)
  }

  handleNavigation = () => {
    let { item } = this.props
    this.props.navigation.push('SopDetail', { sopGuide: item, id: item.id }) 
  }

  performance = (action) => {
    this.init[action]()
  }

  render() {
    let { item, typeIcon, actionIcon, navigation, action } = this.props
    let { name, created_at } = item

    return <ListItem thumbnail>
    <Left>
      <Button transparent style={styleUtils.btnIcon}>
        <Icon type="MaterialIcons" style={{ fontSize:42 }} name={typeIcon} />
      </Button>
    </Left>

    <Body>
      <View>
        <H3>{name}</H3>

        <View style={{ flexDirection: 'row', alignItems:'center', marginTop: 10 }}>
          <Icon name="md-time" style={{ fontSize: 20, marginRight: 5, color: "#666666" }} />
          <Text style={{color: "#666666"}}>
            { moment(created_at).fromNow() }
          </Text>
        </View>
      </View>
    </Body>

    <Right>
      <Button rounded
              onPress={() => this.performance(action) }>
        <Icon type="MaterialIcons" name={actionIcon} />
      </Button>
    </Right>

  </ListItem>
  }
}

export default ListComponent