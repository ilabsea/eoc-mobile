import React, { Component } from "react";
import { YellowBox } from "react-native"
import { service } from "../services"
import HeaderComponent from "../components/HeaderComponent"
import RenderComponent from "./RenderComponent";

// TOREMV
YellowBox.ignoreWarnings(["Remote debugger", "Warning", "Require cycle"])

class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      headerTintColor: 'white',
      headerTitle: params.headerTitle
    }
  }

  constructor(props) {
    super(props)
    this.state = { q: "" }
    this.handleSearch = this.handleSearch.bind(this)
    this.renderer = React.createRef()
  }

  setNavigationParams = () => {
    this.props.navigation.setParams({
      headerTitle: <HeaderComponent 
                      handleSearch={ this.handleSearch }
                      handleQ={(q) => this.setState({ q }) } />
    })
  }

  componentDidMount() {
    this.setNavigationParams()
    service.firebaseManager.setCurrentScreen("SearchScreen", "SearchScreen")
  }

  handleSearch = () => {
    this.renderer.current.handleSearch()
  }

  render() {
    let { q } = this.state
    return <RenderComponent ref={this.renderer} q={q} />
  } 
};

export default SearchScreen;
