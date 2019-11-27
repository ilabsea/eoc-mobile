import React from 'react'
import styleUtils from '../config/styles'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Button, H3, Icon } from 'native-base'
import CardView from 'react-native-cardview'
import { regexHtml } from '../config/utils' 

const TextEllipsis = ({ parent_id, text }) => (
  (parent_id===undefined && text!='') ? 
    <Text numberOfLines={3} 
          ellipsizeMode={'tail'}>
      {text.replace(regexHtml, '')}
    </Text> 
    : null 
)

class ListComponent extends React.Component {
  constructor(props) {
    super(props)

    this.show = this.show.bind(this)
  }

  show() {
    const { item, database, navigation } = this.props
    if( item.description ) {
      navigation.navigate('SopDetail', { item, database })
    }
  }

  render() {
    let { item, typeIcon, color } = this.props
    let { parent_id, name, description } = item

    return <TouchableWithoutFeedback 
              onPress={this.show}>
              <CardView
                    cardElevation={5}
                    cardMaxElevation={2}
                    style={{margin: 10, padding: 10, marginBottom: 0}}
                    cornerRadius={5}>
                <View style={styles.wrapper}>
                  <View style={styles.center}>
                    <Button transparent style={styleUtils.btnIcon}>
                      <Icon type="MaterialIcons" style={{ fontSize:32, color: color }} name={typeIcon} />
                    </Button>
                  </View>
                  <View style={{ flex: 3, justifyContent: 'center' }}>
                    <H3 style={styles.header}>{name}</H3>
                    {
                      description ?
                      <TextEllipsis parent_id={parent_id} text={description} />
                      : null
                    }
                  </View>
                  <View style={styles.center}>
                    { this.props.actionComponent }
                  </View>
                </View>
              </CardView>
            </TouchableWithoutFeedback>
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