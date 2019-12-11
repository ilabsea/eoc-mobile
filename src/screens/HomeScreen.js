import React, { Component } from "react";
import { YellowBox, View, StyleSheet } from "react-native"
import { H3, Button, Icon } from "native-base"
import { service } from "../services"
import RenderComponent from './RenderComponent'
import Root from '../components/Root'
import codePush from "react-native-code-push"

// TOREMV
YellowBox.ignoreWarnings(["Remote debugger", "Warning", "Require cycle"])

const IconSearch = ({ navigation }) => {
  return <Button 
    transparent 
    onPress={() => navigation.navigate('Search') }>
    <Icon name="ios-search" />
  </Button>
}

const HeaderSearch = ({ navigation }) => (
  <View style={{ flex: 1, 
                flexDirection: 'row', 
                justifyContent: 'space-between', alignItems: 'center' }}>
    <H3>Guidelines</H3>
    <IconSearch navigation={navigation} />
  </View>
)

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <View style={styles.headerTitle}>
                            <H3 style={styles.headerText}>Guidelines</H3>
                            <Button transparent 
                                    onPress={() => navigation.navigate("Search") }>
                              <Icon name="ios-search" style={styles.headerText} />
                            </Button>
                          </View>
    }
  }

  componentDidMount() {
    service.firebaseManager.setCurrentScreen("HomeScreen", "HomeScreen")
  }

  openFilter = () => {
    this.props.navigation.navigate('PopupModal')
  }

  handleSearch = () => {
    this.setState({ isSearchClick: true })
  }

  back = () => {
    this.setState({q: "", isSearchClick: false, page: 1, data: []}, () => {
      this.handleFetch("")
    })
  }

  submit() {
    let { q } = this.state

    this.setState({page: 1, data: []}, () => {
      this.handleFetch(q)
    })
  }

  render() {
    return <Root>
          <RenderComponent q="*" shouldLoad={true} />
        </Root>
  } 
};

const styles = StyleSheet.create({
  headerTitle: { 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    paddingLeft: 15 
  },
  headerText: {
    color: "#FFF"
  }
})

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START
}
export default codePush(codePushOptions)(HomeScreen);
