import React from "react"
import styleUtils from "../config/styles"
import { View, StyleSheet, 
          TouchableWithoutFeedback } from "react-native"
import { Button, H3, Icon } from "native-base"
import CardView from "react-native-cardview"
import { withNavigation } from 'react-navigation'

import Textile from "../components/TextileComponent"

class ListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  showDetail() {
    const { item, navigation } = this.props
    navigation.navigate("SopDetail", { item })
  }

  render() {
    let { item, typeIcon, color } = this.props
    let { parent_id, name, description } = item

    return <TouchableWithoutFeedback 
              onPress={() => item.description && this.showDetail()}>
              <CardView
                    cardElevation={5}
                    cardMaxElevation={2}
                    style={styles.cardview}
                    cornerRadius={5}>
                <View style={styles.wrapper}>
                  <View style={styles.center}>
                    <Button transparent style={styleUtils.btnIcon}>
                      <Icon 
                        type="MaterialIcons" 
                        style={[styles.icon, { color: color }]} 
                        name={typeIcon} />
                    </Button>
                  </View>

                  <View style={styles.descriptionWrapper}>
                    <H3 style={styles.header}>{name}</H3>
                    {
                      description ?
                      <Textile parent_id={parent_id} text={description} />
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
    flexDirection: "row" 
  },
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  header: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5
  },
  cardview: {
    margin: 10, 
    paddingTop: 10, 
    paddingBottom: 10, 
    marginBottom: 0
  },
  descriptionWrapper: { 
    flex: 3, 
    justifyContent: "center" 
  },
  icon: {
    fontSize: 42
  }
})

export default withNavigation(ListComponent)