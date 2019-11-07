import React, { Component } from "react";
import { YellowBox, View, StyleSheet } from "react-native"
import { H3, Button, Icon } from "native-base"
import { service } from "../services"
import RenderComponent from './RenderComponent'

// TOREMV
YellowBox.ignoreWarnings(["Remote debugger", "Warning", "Require cycle"])

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

  render() {
    return <RenderComponent q="" shouldLoad={true} />
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

export default HomeScreen;
