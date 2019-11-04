import React from 'react'
import styleUtils from '../config/styles'
import { View, Text } from 'react-native'
import { Button, Left, H3,
  Right, Body, Icon, ListItem } from 'native-base'
import TimeAgoComponent from '../components/TimeAgoComponent'

const Textile = ({ parent_id, text }) => (
  parent_id === undefined ? <Text>{text}</Text> : null 
)

class ListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  showDetail() {
    const { item, database, navigation } = this.props
    navigation.navigate('SopDetail', { item, database })
  }

  render() {
    let { item, typeIcon, color } = this.props
    let { parent_id, name, tags, description, created_at } = item
    console.log(item, parent_id)

    return <ListItem thumbnail onPress={() => this.showDetail()}>
    <Left>
      <Button transparent style={styleUtils.btnIcon}>
        <Icon type="MaterialIcons" style={{ fontSize:42, color: color }} name={typeIcon} />
      </Button>
    </Left>

    <Body>
      <View>
        <H3>{name}</H3>
        <Textile parent_id={parent_id} text={tags} />
        <Textile parent_id={parent_id} text={description} />
        <TimeAgoComponent time={created_at} />
      </View>
    </Body>

    <Right>
      { this.props.actionComponent }
    </Right>

  </ListItem>
  }
}

export default ListComponent