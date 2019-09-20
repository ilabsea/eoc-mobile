import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import axios from 'axios'
import {Container, Header, Item, Input, Left, Body, Right, Title, Button, Content, List, ListItem, Text, Icon} from 'native-base';
// import { data } from '../data'


class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchText: '',
      lazy: 0,
      data: []
    }

    this.timeId = null
    this.handleSearch = this.handleSearch.bind(this)
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
    console.log('fetch...', this.state.searchText)
    let data = await axios.get('http://10.0.2.2:3000/sops.json', {
                    params: {
                      searchText: searchText
                    }
                  })
                  .then(function (response) {
                    return response.data
                  })
    this.setState({data})
  }

  handleSearch = (searchText) => {
    this.setState({searchText, lazy: 1})
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
                onChangeText={(searchText) => this.handleSearch(searchText) } />
            <Icon name="ios-search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <List
            dataArray={this.state.data}
            keyExtractor={item => item.id.toString()}
            renderRow={item => {
              return (
                <ListItem onPress={() => this.handleListPress.bind(this, item)}>
                  <Text>{item.name}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
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
