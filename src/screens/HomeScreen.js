import React, { Component } from 'react';
import { YellowBox, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import * as config from '../config/connectionBase'
import { Container, Header, Item, Input, 
          Button, List, Text, Icon } from 'native-base'
import EmptyList from './EmptyList'

import firebase from 'react-native-firebase'
import { service } from '../services'
import ListComponent from '../components/ListComponent';
import { iconMapping } from '../config/utils'
import NavigateComponent from '../components/NavigateComponent'
import DownloadComponent from '../components/DownloadComponent';

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger', 'Warning', 'Require cycle'])

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      from: 0,
      size: 15,
      keyword: 'cat 1',
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
    service.firebaseManager.setCurrentScreen('HomeScreen', 'HomeScreen')

    this.searchInput.current._root.focus()
    this.checkPermission()
    this.createNotificationListeners()
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }
  
  checkPermission() {
    firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
        this.getToken();
      } else {
        console.log('user doesn\'t have permission')
        this.request()
      } 
    });
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken);
        service.apiManager.saveToken(fcmToken)
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
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
                actionComponent={<Action item={item._source} navigation={navigation} database={database} />}
                action={action} />
  }

  openDir = async () => {
    // this.props.navigation.navigate('MyModal')
    let db = this.props.database
    let downloadsCollection = db.collections.get('downloads')

    await db.action(async () => {
      await downloadsCollection.query().markAllAsDeleted() // syncable
      await downloadsCollection.query().destroyAllPermanently() // permanent

      Alert.alert('destroy collection')
    })
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
            <Input 
                onSubmitEditing={ this.handleSearch }
                ref={this.searchInput} 
                placeholder="Search"
                value={this.state.keyword}
                onChangeText={(keyword) => this.setState({keyword}) } />
            <Icon name="ios-search" 
                  onPress={ this.handleSearch } />
            <Icon type="MaterialIcons" 
                  name="open-in-new" 
                  onPress={() => this.openDir()} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <EmptyList {...this.state} />
        {
          this.state.data.length > 0 ?
          <List
            dataArray={this.state.data}
            keyExtractor={item => `${item._index}-${item._source.id.toString()}`}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.5}
            renderRow={(item) => this.renderRow(item)}
          />: null
        }
        
      </Container>
    );
  } 
};

export default HomeScreen;
