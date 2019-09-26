import React, {Component} from 'react';
import {StyleSheet, View, Alert, ActivityIndicator, YellowBox} from 'react-native';
import axios from 'axios'
import * as config from '../config/base'
import moment from 'moment'
import {Container, Header, Item, Input, Left, Body, Right, Title, Button, Content, List, ListItem, Text, Icon, H1, H3} from 'native-base';
import { data } from '../data'
import { typeIcon } from '../config/utils'

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger'])



class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      from: 0,
      size: 15,
      searchText: 'name',
      data: data
    }

    this.hl = this.hl.bind(this)
    this.searchInput = React.createRef();
    this.loadMore = this.loadMore.bind(this)
    this.handleFetch = this.handleFetch.bind(this)
    this._renderRow = this._renderRow.bind(this)
  }

  handleListPress = item => {
    this.props.navigation.navigate({
      routeName: 'SopDetail',
      params: {
        sopGuide: item,
      },
    });
  };

  handleFetch = async (searchText) => {
    let { from, size } = this.state
    let uri = `${config.host}:${config.port}/${config.sops_path}`
    let params = { searchText, from, size }

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
      
      console.log(data)
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
    this.handleFetch(this.state.searchText)
  }

  hl = ( str ) => {
    let reg = /<em class='highlight'>.*<\/em>/
    let items = str.split(reg)

    result  = /<em class='highlight'>(.*)<\/em>/.exec(str)

    search_value = result[1]
    ele = React.createElement(H3, {key: 999, style: styles.searchResult}, search_value)

    let data = []
    items.forEach((item, index) => {
      data.push(React.createElement(H3, {key: index}, item))
      if( index < items.length-1 )
        data.push(ele)
    });

    return data
  }

  _renderRow = (item) => {
    let { icon, color } = typeIcon(item._source.document_type)
    return (
      <ListItem icon 
        style={styles.listItem}
        onPress={ () => this.handleListPress(item._source) }>
        <Left style={styles.left}>
          <Button style={styles.btnIcon}>
            <Icon type="AntDesign" style={{ color, fontSize:30 }} name={ icon } />
          </Button>
        </Left>
        <Body>
          <View style={styles.title}>
            <Text>
            { 
              item.highlight && 
                this.hl( item.highlight.name[0] ).map( item => {
                return item 
              }) 
            }
            </Text>
            <Text style={styles.timeago}>
              { moment(item._source.created_at).fromNow() }
            </Text>
          </View>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-menu" />
            <Input ref={this.searchInput} 
                placeholder="Search"
                value={this.state.searchText}
                onChangeText={(searchText) => this.setState({searchText}) } />
            <Icon name="ios-search" 
                  onPress={() => this.handleFetch(this.state.searchText)} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <List
            style={styles.list}
            dataArray={this.state.data}
            keyExtractor={item => item._source.id.toString()}
            onEndReached={this.loadMore }
            onEndReachedThreshold={0.5}
            renderRow={ this._renderRow }
          />

        {
          this.state.isFetching ? 
            <ActivityIndicator 
            style={{opacity: this.state.isFetching ? 1.0 : 0.0}} 
            size="large" color="#0000ff" animating={true} /> : null
        }
        
      </Container>
    );
  } 
};

const styles = StyleSheet.create({
  timeago: {
    color: '#666666',
  },
  title: { 
    marginBottom: 15 
  },
  btnIcon: { 
    backgroundColor: "#fff", 
    width: 40, 
    height:40,
    marginBottom: 20 
  },
  listItem: {
    marginBottom: 10, 
    marginTop: 10
  },
  left: { 
    width: 50 
  },
  searchResult: { 
    color: '#4a148c', 
    fontWeight: 'bold' 
  },
  list: { 
    marginTop: 20 
  }
});

HomeScreen.navigationOptions = {
  header:null
  // headerTitle: 'Recent guideline',
  // headerStyle: {
  //   backgroundColor: '#f4511e',
  // },
  // headerTintColor: '#fff',
  // headerRight: <Icon name="md-search" style={styles.icon} />,
};

export default HomeScreen;
