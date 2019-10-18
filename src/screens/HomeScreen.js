import React, { Component } from 'react';
import { YellowBox } from 'react-native'
import axios from 'axios'
import * as config from '../config/connectionBase'

import { Container, Header, Item, Input, 
          Button, List, Text, Icon } from 'native-base'
import EmptyList from './EmptyList'

import RowItem from './RowItem'

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger'])

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      from: 0,
      size: 15,
      keyword: 'disease',
      data: [],
    }

    this.searchInput = React.createRef()
    this.loadMore = this.loadMore.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.handleFetch = this.handleFetch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleFetch = async (keyword) => {
    let { from, size } = this.state
    let uri = `${config.host.staging}:${config.port}/${config.sops_path}`
    let params = { keyword, from, size }

    try {
      let data = await axios.get(uri, { params })
                    .then( resp => resp.data )
                    .catch( error => error)

      if( data.length > 0 ) {
        this.setState( (prev) => {
          return {
            data: [...prev.data, ...data],
            from: prev.from + prev.size
          }
        })
      }
      
      this.setState({isFetching: false})
    } catch ( e ) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.searchInput.current._root.focus()
  }

  loadMore = () => {
    this.setState({isFetching: true})
    this.handleFetch(this.state.keyword)
  }

  handleSearch = () => {
    const { keyword } = this.state

    if( keyword != '' ) {
      this.setState({ from: 0, data: [], isFetching: true }, () => {
        this.handleFetch(keyword)
      })
    }
  }

  renderRow = (item) => {
    return <RowItem item={item} />
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
            <Input ref={this.searchInput} 
                placeholder="Search"
                value={this.state.keyword}
                onChangeText={(keyword) => this.setState({keyword}) } />
            <Icon name="ios-search" 
                  onPress={ this.handleSearch } />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <EmptyList {...this.state} />
        <List
          dataArray={this.state.data}
          keyExtractor={item => item._source.id.toString()}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
          renderRow={(item) => this.renderRow(item)}
        />
      </Container>
    );
  } 
};

export default HomeScreen;
