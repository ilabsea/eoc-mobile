import React, { Component } from 'react';
import { YellowBox, FlatList, View } from 'react-native'

import axios from 'axios'
import * as config from '../config/connectionBase'
import { Container, H3, Button, Icon } from 'native-base'

import { service } from '../services'
import { iconMapping } from '../config/utils'
          
import EmptyList  from './EmptyList'
import ListComponent from '../components/ListComponent';
import NavigateComponent from '../components/NavigateComponent'
import DownloadComponent from '../components/DownloadComponent';

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger', 'Warning', 'Require cycle'])

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
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      headerTitle: () => <HeaderSearch navigation={navigation} />
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      isSearchClick: false,
      isFetching: true,
      page: 1,
      q: '',
      data: [],
    }

    this._textInput = React.createRef()
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
    this.handleFetch('')
    service.firebaseManager.setCurrentScreen('HomeScreen', 'HomeScreen')
  }

  loadMore = () => {
    this.setState({isFetching: true})
    this.handleFetch(this.state.q)
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

  handleSearch = () => {
    this.setState({ isSearchClick: true })
  }

  back = () => {
    this.setState({q: '', isSearchClick: false, page: 1, data: []}, () => {
      this.handleFetch('')
    })
  }

  submit() {
    let { q } = this.state

    this.setState({page: 1, data: []}, () => {
      this.handleFetch(q)
    })
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

export default HomeScreen;
