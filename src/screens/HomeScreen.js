import React, { Component } from "react";
import { YellowBox, FlatList, View, StyleSheet } from "react-native"

import axios from "axios"
import * as config from "../config/connectionBase"
import { Container, H3, Button, Icon } from "native-base"

import { service } from "../services"
import { iconMapping } from "../config/utils"
          
import EmptyList  from "./EmptyList"
import ListComponent from "../components/ListComponent";
import NavigateComponent from "../components/NavigateComponent"
import DownloadComponent from "../components/DownloadComponent";

// TOREMV
YellowBox.ignoreWarnings(["Remote debugger", "Warning", "Require cycle"])

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <View style={styles.headerTitle}>
                            <H3>Guidelines</H3>
                            <Button transparent 
                                    onPress={() => navigation.navigate("Search") }>
                                <Icon name="ios-search" />
                              </Button>
                          </View>
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      isFetching: true,
      page: 1,
      q: "",
      data: [],
    }

    this.loadMore = this.loadMore.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.handleFetch = this.handleFetch.bind(this)
  }

  handleFetch = async (q) => {
    let { page } = this.state
    let uri = `${config.uri}/${config.sops_path}`
    let params = { q, page }

    try {
      let data = await axios.get(uri, { params })
                    .then( resp => resp.data )
                    .catch( error => error)

      if( data.length > 0 ) {
        this.setState( (prev) => {
          return {
            data: [...prev.data, ...data],
            page: prev.page + 1
          }
        })
      }
      
      this.setState({isFetching: false})
    } catch(error) {
      service.toastManager.show(error)
    }
  }

  componentDidMount() {
    this.handleFetch("")
    service.firebaseManager.setCurrentScreen("HomeScreen", "HomeScreen")
  }

  loadMore = () => {
    this.setState({isFetching: true})
    this.handleFetch(this.state.q)
  }

  renderRow = (item) => {
    let { typeIcon, actionIcon, action, color } = iconMapping(item._index)

    const Action = (action == "download") ? DownloadComponent : NavigateComponent
    return <ListComponent 
                item={item._source} 
                typeIcon={typeIcon}
                actionIcon={actionIcon}
                color={color}
                actionComponent={<Action item={item._source} />}
                action={action} />
  }

  render() {
    return (
      <Container>
        <EmptyList {...this.state} />
        {
          this.state.data.length > 0 ?
          <FlatList
            data={this.state.data}
            keyExtractor={item => `${item._index}-${item._source.id.toString()}`}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => this.renderRow(item)}
            contentContainerStyle={{ paddingBottom: 20}}
          />: null
        }
      </Container>
    );
  } 
};

const styles = StyleSheet.create({
  headerTitle: { 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  }
})

export default HomeScreen;
