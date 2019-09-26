import React, {Component} from 'react';
import {StyleSheet, View, Alert, ActivityIndicator, YellowBox} from 'react-native';
import axios from 'axios'
import * as config from '../config/base'
import moment from 'moment'
import {Container, Header, Item, Input, Left, Body, Right, Title, Button, Content, List, ListItem, Text, Icon, H1, H3} from 'native-base';
import { typeIcon } from '../config/utils'
import { data } from '../data'

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger'])

const EmptyList = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row' }}>
      <Icon name="ios-heart-empty" style={{ marginRight: 15, marginTop: 2 }} />
      <H1>Empty list</H1>
    </View>
  </View>
)

class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      from: 0,
      size: 15,
      searchText: 'កម្ពុជា',
      data: []
    }

    this.searchInput = React.createRef();
    this.loadMore = this.loadMore.bind(this)
    this._renderRow = this._renderRow.bind(this)
    this.handleFetch = this.handleFetch.bind(this)
    this.highlighter = this.highlighter.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleListPress = sopGuide => {
    this.props.navigation.navigate({
      routeName: 'SopDetail',
      params: { sopGuide },
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

  tmplRegex = (pattern) => new RegExp(`<em class='highlight'>${pattern}<\/em>`, 'iu')
  eleCreator = (ele, props, wrapper) => React.createElement(wrapper, props, ele)

  handleSearch = () => {
    this.setState({ from: 0, data: [], isFetching: true }, () => {
      this.handleFetch(this.state.searchText)
    })
  }

  highlighter = ( hlStr, wrapper ) => {
    let data = [],
        pattern = '[^<>()]+',
        props = { style: styles.searchResult }

    let plainItems = hlStr.split( this.tmplRegex(pattern) ) // no highlight items
    let hlValue  = this.state.searchText 

    plainItems.forEach((item, index) => {
      data.push( this.eleCreator(item, {key: index}, wrapper) )
      if( index < plainItems.length-1 ) {
        key = plainItems.length + index
        data.push( this.eleCreator(hlValue, { ...props, key }, wrapper) )
      }
    })

    return data
  }

  _renderSubItem = (subItem, tag, fallback) => {
    return subItem ? this.highlighter( subItem[0], tag ).map( item => item) : fallback
  }

  _renderRow = (item) => {
    let { icon, color } = typeIcon(item._source.document_type)
    let { name, tags } = item.highlight

    return (
      <ListItem thumbnail 
        onPress={ () => this.handleListPress(item._source) }>
        <Left>
          <Button style={styles.btnIcon}>
            <Icon type="AntDesign" style={{ color, fontSize:30 }} name={ icon } />
          </Button>
        </Left>
        <Body>
          <View>
            <Text>
            { 
              this._renderSubItem(name, H3, <H3>{item._source.name}</H3>)
            }
            </Text>

            {
              tags ? 
              <Text>
                tags: { this._renderSubItem(tags, Text, null) }
              </Text> 
              : null
            }

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
                  onPress={ this.handleSearch } />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        {
          this.state.data.length == 0 ?
          <EmptyList />
          :
          <List
              dataArray={this.state.data}
              keyExtractor={item => item._source.id.toString()}
              onEndReached={this.loadMore }
              onEndReachedThreshold={0.5}
              renderRow={ this._renderRow }
            />
        }

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
    color: "#666666",
    marginTop: 10
  },
  btnIcon: { 
    backgroundColor: "#fff", 
  },
  searchResult: { 
    color: "#4a148c", 
    fontWeight: "bold" 
  },
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
