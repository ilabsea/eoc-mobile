import React, {Component} from 'react';
import {StyleSheet, Alert, ActivityIndicator, YellowBox} from 'react-native';
import axios from 'axios'
import * as config from '../config/base'
import {Container, Header, Item, Input, Left, Body, Right, Title, Button, Content, List, ListItem, Text, Icon} from 'native-base';
// import { data } from '../data'

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger'])

const typeIcon = (docType) => {
  let doc = { document: { icon: 'pdffile1', color: 'red' }, 
              folder: { icon: 'folder1', color: 'orange' } }
  return doc[docType]
}

class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      from: 0,
      size: 15,
      searchText: '',
      data: []
    }

    this.hl = this.hl.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.handleFetch = this.handleFetch.bind(this)
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
      
      this.setState({isFetching: false})
    } catch ( e ) {
      console.log(e)
    }
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
    ele = React.createElement(Text, {key: 999, style: {color: 'green'}}, search_value)

    let data = []
    items.forEach((item, index) => {
      data.push(React.createElement(Text, {key: index}, item))
      if( index < items.length-1 )
        data.push(ele)
    });

    return data
  }

  render() {
    

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-menu" />
            <Input placeholder="Search"
                value={this.state.searchText}
                onChangeText={(searchText) => this.setState({searchText}) } />
            <Icon name="ios-search" onPress={() => this.handleFetch(this.state.searchText)} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <List
            dataArray={this.state.data}
            keyExtractor={item => item._source.id.toString()}
            onEndReached={this.loadMore }
            onEndReachedThreshold={0.5}
            renderRow={item => {
              let { icon, color } = typeIcon(item._source.document_type)
              return (
                <ListItem icon onPress={() => this.handleListPress.bind(this, item._source)}>
                  <Left>
                    <Button style={{ backgroundColor: "#fff" }}>
                      <Icon type="AntDesign" style={{ color }} name={ icon } />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{ 
                      this.hl( item.highlight.name[0] ).map( (item, i) => {
                      return item 
                    }) }
                    </Text>
                    {/* <Text>{ item.highlight.tags && item.highlight.tags[0] }</Text> */}
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              );
            }}
          />

        <ActivityIndicator 
          style={{opacity: this.state.isFetching ? 1.0 : 0.0}} 
          size="large" color="#0000ff" animating={true} />
        
      </Container>
    );
  } 
};

const styles = StyleSheet.create({
  icon: {
    color: '#fff',
    fontSize: 26,
    marginEnd: 10,
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
