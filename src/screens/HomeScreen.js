import React, { Component } from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
import axios from 'axios'
import * as config from '../config/base'
import moment from 'moment'
import { Container, Header, Item, Input, Left, Body, Right, 
          Button, List, ListItem, Text, Icon, H3 } from 'native-base';
import { typeIcon } from '../config/utils'
import { data } from '../data'

import EmptyList from './EmptyList'

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger'])

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      from: 0,
      size: 15,
      searchText: 'disease',
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
    let uri = `${config.host.staging}:${config.port}/${config.sops_path}`
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
    const { searchText } = this.state

    if( searchText != '' ) {
      this.setState({ from: 0, data: [], isFetching: true }, () => {
        this.handleFetch(searchText)
      })
    }
  }

  highlighter = ( hlStr, wrapper ) => {
    let data = [],
        pattern = '[^<>()]+',
        props = { style: styles.searchResult }

    let plainItems = hlStr.split( this.tmplRegex(pattern) )
    let hlValue  = this.tmplRegex(`(${pattern})`).exec(hlStr)

    plainItems.forEach((item, index) => {
      data.push( this.eleCreator(item, {key: index}, wrapper) )
      if( index < plainItems.length-1 ) {
        key = plainItems.length + index
        data.push( this.eleCreator(hlValue[1], { ...props, key }, wrapper) )
      }
    })

    return data
  }

  hl = (text, Tag) => {
    let data = []
    words = text.split(/\s/)
    let regex = /class='highlight'>\w+<\/em>/

    words.forEach( (word, index) => {
      if( word == '<em' && regex.test(words[index+1]) ) return

      if( regex.test(word) ) {
        hl = />(\w+)</.exec(word)
        data.push(<Tag key={index} style={styles.searchResult}>{hl[1]}</Tag>)
      } else  {
        data.push(<Tag key={index}>{word}</Tag>)
      }
      data.push(<Text key={index + Date.now()}>{' '}</Text>)
    })

    return data
  }

  _renderSubItem = (subItem, tag, fallback) => {
    return subItem ? this.hl( subItem[0], tag ).map( item => item ) : fallback
  }

  _renderRow = (item) => {
    let { document_type } = item._source
    let { type, icon, color } = typeIcon(document_type)
    let { name, tags } = item.highlight

    return (
      <ListItem thumbnail 
        onPress={ () => this.handleListPress(item._source) }>
        <Left>
          <Button transparent style={styles.btnIcon}>
            <Icon type={type} style={{ color, fontSize:42 }} name={ icon } />
          </Button>
        </Left>
        <Body>
          <View>
            <Text>
              { this._renderSubItem(name, H3, <H3>{item._source.name}</H3>) }
            </Text>
            {
              tags ?  <Text> tags: { this._renderSubItem(tags, Text, null) } </Text>  : null
            }
            <Text style={styles.timeago}>
              { moment(item._source.created_at).fromNow() }
            </Text>
          </View>
        </Body>
        <Right>
          {
            document_type == 'document' ?
              <Icon name="arrow-forward" /> :
              <Icon name="md-download" />
          }
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
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
          <EmptyList {...this.state} />
          <List
            dataArray={this.state.data}
            keyExtractor={item => item._source.id.toString()}
            onEndReached={this.loadMore }
            onEndReachedThreshold={0.5}
            renderRow={ this._renderRow }
          />
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
    borderWidth: 0
  },
  searchResult: { 
    color: "#4a148c", 
    backgroundColor: "yellow",
    fontWeight: "bold",
  },
});

HomeScreen.navigationOptions = {
  header:null,
  // headerTitle: 'Recent guideline',
  // headerStyle: {
  //   backgroundColor: '#f4511e',
  // },
  // headerTintColor: '#fff',
  // headerRight: <Icon name="md-search" style={styles.icon} />,
};

export default HomeScreen;
