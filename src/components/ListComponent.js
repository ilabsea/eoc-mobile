import React from 'react'
import styleUtils from '../config/styles'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Left, H3,
  Right, Body, Icon, ListItem } from 'native-base'
import TimeAgoComponent from '../components/TimeAgoComponent'
import CardView from 'react-native-cardview'

const Textile = ({ parent_id, text }) => (
  (parent_id===undefined && text!='') ? <Text>{text}</Text> : null 
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

    return <TouchableOpacity onPress={() => this.showDetail()}>
      <CardView
            cardElevation={5}
            cardMaxElevation={2}
            style={{margin: 10, padding: 10, marginBottom: 0}}
            cornerRadius={5}>
      <View style={styles.wrapper}>
        <View style={styles.center}>
          <Button transparent style={styleUtils.btnIcon}>
            <Icon type="MaterialIcons" style={{ fontSize:42, color: color }} name={typeIcon} />
          </Button>
        </View>

        <View style={{ flex: 3 }}>
          <H3 style={styles.header}>{name}</H3>
          <Textile parent_id={parent_id} text={description} />
        </View>

        <View style={styles.center}>
          { this.props.actionComponent }
        </View>
      </View>

  </CardView>
  </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    flexDirection: 'row' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  }
})

export default ListComponent