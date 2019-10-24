import React from 'react'
import { View } from 'react-native'
import moment from 'moment'
import { Left, Body, Right, Button, 
          ListItem, Text, Icon, H3 } from 'native-base'
import { basename, highlight } from '../config/utils'
import * as config from '../config/connectionBase'
import { service } from '../services'
import styleUtils from '../config/styles'
import { withNavigation } from 'react-navigation'

class RowItem extends React.Component {
  constructor(props) {
    super(props)
  }

  _renderSubItem = (esHighlightStr, tag, fallbackComponent) => {
    return esHighlightStr ? 
            highlight( esHighlightStr[0], tag ) 
            : fallbackComponent
  }

  handleDownload(item) {
    let remoteURL = `${config.host.staging}:${config.port}${item.file.url}`
    let filename = basename(remoteURL)

    service.downloadManager.download( remoteURL, filename )
    service.toastManager.show(`Downloaded completed!`)
  }

  handleListPress = item => {
    this.props.navigation.navigate({
      routeName: 'SopDetail',
      params: { sopGuide: item._source, id: item._id },
    });
  };

  render() {
    let { item } = this.props
    let { name, tags } = item.highlight

    return (<ListItem thumbnail>
      <Left>
        <Button transparent style={styleUtils.btnIcon}>
          <Icon style={{ fontSize:42 }} />
        </Button>
      </Left>
      <Body>
        <View>
          <Text>
            { this._renderSubItem(name, H3, <H3>{item._source.name}</H3>) }
          </Text>
          {
            tags ?  <Text> tags: { this._renderSubItem(tags, Text, null) } </Text>  : null
          }
  
          <View style={{ flexDirection: 'row', alignItems:'center', marginTop: 10 }}>
            <Icon name="md-time" style={{ fontSize: 20, marginRight: 5, color: "#666666" }} />
            <Text style={{color: "#666666"}}>
              { moment(item._source.created_at).fromNow() }
            </Text>
          </View>
        </View>
      </Body>
      <Right>
        <Button rounded
                onPress={() => this.handleListPress(item)}>
          <Icon name="arrow-forward" />
        </Button>
      </Right>
    </ListItem> )
  }
} 

export default withNavigation(RowItem)