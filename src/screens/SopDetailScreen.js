import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Content, Header, Left, 
          Right, Body, Title, Icon, List, ListItem } from 'native-base'
import moment from 'moment';
import { service } from '../services';
import { withNavigation } from 'react-navigation'

class SopDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  async componentDidMount() {
    try {
      let { navigation } = this.props
      const sopGuide = navigation.getParam('sopGuide')
      console.log(sopGuide)
      const id = navigation.getParam('id')

      let categories = await service.apiManager.fetch_category_children(sopGuide.id)
      this.setState({
        categories
      })
    } catch( e) {
      console.log(e)
    }
  }

  navigate(c) {
    this.props.navigation.push('SopDetail', { sopGuide: c, id: c.id })
  }

  render() {
    let { navigation } = this.props
    const sopGuide = navigation.getParam('sopGuide')

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={ () => navigation.goBack() }>
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{ 'hi' }</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List>
            {
              this.state.categories.map( c => {
                return <ListItem key={c.id} onPress={ () => this.navigate(c) }>
                  <Text>{c.name}</Text>
                </ListItem>
              })
            }
          </List>
        </Content>
      </Container>
    )
  }
}

SopDetailScreen.navigationOptions = navigationData => {
  const sopGuide = navigationData.navigation.getParam('sopGuide');

  return {
    headerStyle: {
      backgroundColor: '#6b52ae',
    },
    headerTintColor: '#fff',
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default withNavigation(SopDetailScreen)
