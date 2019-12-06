import React from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { Container, Content, H1 } from "native-base"
import { Sop, service } from "../services"
import { regexHtml } from "../config/utils" 

class SopDetailScreen extends React.Component {
  static navigationOptions = {
    title: "Detail"
  }

  constructor(props) {
    super(props);
    this.state = {
      item: null
    }
  }

  async componentDidMount() {
    let item, { navigation } = this.props
    let itemId = navigation.getParam("itemId")

    if( itemId ) {
      let response = await Sop.find(itemId)
      item = response.data
    } else {
      item = navigation.getParam("item")
    }

    this.setState({ item })

    service.firebaseManager
      .setCurrentScreen("SopDetailScreen", "SopDetailScreen")
  }

  render() {
    let { item } = this.state
    if(!item) return <ActivityIndicator />

    return <Container>
            <Content contentContainerStyle={{ justifyContent: "center", flex: 1 }}>
              <View style={{ justifyContent: "center", alignItems: "center", padding: 10 }}>
                <H1 style={{ marginBottom: 15 }}>{item.name}</H1>
                <Text>{item.tags}</Text>
                <Text style={{ fontSize: 18, lineHeight: 30, textAlign: "center" }}>
                  {item.description.replace(regexHtml, "")}
                </Text>
              </View>
            </Content>
          </Container>
  }
}

export default SopDetailScreen