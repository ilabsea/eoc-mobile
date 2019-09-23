import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import axios from 'axios'
import {Container, Header, Item, Input, Left, Body, Right, Title, Button, Content, List, ListItem, Text, Icon} from 'native-base';
// import { data } from '../data'


class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      from: 0,
      size: 15,
      searchText: '',
      data: []
    }

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

    try {
      let data = await axios.get('http://10.0.2.2:3000/api/v1/sops.json', {
                      params: { searchText, from, size}
                    })
                    .then(function (response) {
                      return response.data
                    })
                    .catch(function (error) {
                      return error
                    })

      // this.setState({data})
      if( data.length > 0 ) {
        this.setState( (prev) => {
          return {
            data: [...prev.data, ...data],
            from: prev.from + prev.size
          }
        })
      }
    } catch ( e ) {
      console.log(e)
    }
  }

  loadMore = () => {
    let { searchText, from, size } = this.state
    this.handleFetch(searchText)
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
              return (
                <ListItem onPress={() => this.handleListPress.bind(this, item._source)}>
                  <Text>{item._source.name}</Text>
                </ListItem>
              );
            }}
          />
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
