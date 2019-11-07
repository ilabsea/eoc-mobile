import React, { Component } from 'react';
import { YellowBox, FlatList, View } from 'react-native'

import axios from 'axios'
import * as config from '../config/connectionBase'
import { Container, Header, Item, Input, 
          Button, List, Text, Icon } from 'native-base'

import { service } from '../services'
import { iconMapping } from '../config/utils'
          
import EmptyList  from './EmptyList'
import ListComponent from '../components/ListComponent';
import NavigateComponent from '../components/NavigateComponent'
import DownloadComponent from '../components/DownloadComponent';

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger', 'Warning', 'Require cycle'])

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      page: 1,
      q: 'flu',
      data: [],
    }

    this.searchInput = React.createRef()
    this.loadMore = this.loadMore.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.handleFetch = this.handleFetch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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
    } catch(e) {
      service.toastManager.show(e)
    }
  }

  componentDidMount() {
    service.firebaseManager.setCurrentScreen('HomeScreen', 'HomeScreen')
    this.searchInput.current._root.focus()
  }

  loadMore = () => {
    this.setState({isFetching: true})
    this.handleFetch(this.state.q)
  }

  handleSearch = () => {
    const { q } = this.state

    if( q != '' ) {
      this.setState({ page: 1, data: [] }, () => {
        this.handleFetch(q)
      })

      service.firebaseManager.logEvent('evtSearch', { q })
    }
  }

  renderRow = (item) => {
    let { typeIcon, actionIcon, action, color } = iconMapping(item._index)
    let { database, navigation } = this.props

    const Action = (action == 'download') ? DownloadComponent : NavigateComponent
    return <ListComponent 
                database={this.props.database}
                item={item._source} 
                typeIcon={typeIcon}
                actionIcon={actionIcon}
                navigation={this.props.navigation}
                color={color}
                actionComponent={<Action item={item._source} 
                                          navigation={navigation} 
                                          database={database} />}
                action={action} />
  }

  openFilter = () => {
    let { navigation } = this.props
    navigation.navigate('PopupModal', { returnRoute: navigation.state })
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            {/* <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} /> */}
            <Input 
                onSubmitEditing={ this.handleSearch }
                ref={this.searchInput} 
                placeholder="Search"
                value={this.state.q}
                onChangeText={(q) => this.setState({q}) } />
            <Icon name="ios-search" 
                  onPress={ this.handleSearch } />
            <Icon type="MaterialIcons" 
                  name="filter-list" 
                  onPress={() => this.openFilter()} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
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

export default HomeScreen;
