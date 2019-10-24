import React from 'react'
import styleUtils from '../config/styles'
import moment from 'moment'
import { View, Text } from 'react-native'
import { Button, Left, H3,
  Right, Body, Icon, ListItem } from 'native-base'

const ListComponent = ({ item, typeIcon, actionIcon, navigation }) => {
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
              onPress={() => navigation.push('SopDetail', { sopGuide: item, id: item.id })}>
        <Icon type="MaterialIcons" name={actionIcon} />
      </Button>
    </Right>

  </ListItem>
}

export default ListComponent