import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Content, Header, Left, H3,
          Right, Body, Title, Icon, List, ListItem } from 'native-base'
import moment from 'moment';
import { service } from '../services';
import { withNavigation } from 'react-navigation'
import styleUtils from '../config/styles'

class Item extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<ListItem thumbnail>
      <Left>
        <Button transparent style={styleUtils.btnIcon}>
          <Icon style={{ fontSize:42 }} />
        </Button>
      </Left>
      <Body>
        <View>
          <Text>
            <H3>{name}</H3>
          </Text>

          <View style={{ flexDirection: 'row', alignItems:'center', marginTop: 10 }}>
            <Icon name="md-time" style={{ fontSize: 20, marginRight: 5, color: "#666666" }} />
            <Text style={{color: "#666666"}}>
              { moment(created_at).fromNow() }
            </Text>
          </View>
        </View>
      </Body>
      <Right>
        <Button rounded
                onPress={() => this.navigate(id)}>
          <Icon name="arrow-forward" />
        </Button>
      </Right>
    </ListItem>
    )
  }
}

class SopDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sops: [],
      children: []
    }
  }

  async componentDidMount() {
    try {
      let { navigation } = this.props
      const sopGuide = navigation.getParam('sopGuide')
      console.log(sopGuide)
      const id = navigation.getParam('id')

      let { sops, children } = await service.apiManager.fetch_category_children(sopGuide.id)
      this.setState({
        sops, children
      })
    } catch( e) {
      console.log(e)
    }
  }

  navigate(c) {
    console.log("c", c)
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
            <Title>{ sopGuide.name }</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <H3>Sops:</H3>
          <List>
            {
              this.state.sops.map( c => {
                return <ListItem thumbnail key={c.id}>
                  <Left>
                    <Button transparent style={styleUtils.btnIcon}>
                      <Icon type="MaterialIcons" style={{ fontSize:42 }} name="insert-drive-file" color="#6E0505" />
                    </Button>
                  </Left>

                  <Body>
                    <View>
                      <Text>
                        <H3>{c.name}</H3>
                      </Text>

                      <View style={{ flexDirection: 'row', alignItems:'center', marginTop: 10 }}>
                        <Icon name="md-time" style={{ fontSize: 20, marginRight: 5, color: "#666666" }} />
                        <Text style={{color: "#666666"}}>
                          { moment(c.created_at).fromNow() }
                        </Text>
                      </View>
                    </View>
                  </Body>

                  <Right>
                    <Button rounded
                            onPress={() => this.navigate(c)}>
                      <Icon type="MaterialIcons" name="file-download" />
                    </Button>
                  </Right>

                </ListItem>
              })
            }
          </List>

          <H3>Children:</H3>
          <List>
            {
              this.state.children.map( c => {
                return <ListItem thumbnail key={c.id}>
                  <Left>
                    <Button transparent style={styleUtils.btnIcon}>
                      <Icon style={{ fontSize:42 }} name="folder" color="gray" />
                    </Button>
                  </Left>

                  <Body>
                    <View>
                      <Text>
                        <H3>{c.name}</H3>
                      </Text>

                      <View style={{ flexDirection: 'row', alignItems:'center', marginTop: 10 }}>
                        <Icon name="md-time" style={{ fontSize: 20, marginRight: 5, color: "#666666" }} />
                        <Text style={{color: "#666666"}}>
                          { moment(c.created_at).fromNow() }
                        </Text>
                      </View>
                    </View>
                  </Body>

                  <Right>
                    <Button rounded
                            onPress={() => this.navigate(c)}>
                      <Icon type="MaterialIcons" name="arrow-forward" />
                    </Button>
                  </Right>
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
  return {
    headerStyle: {
      backgroundColor: '#6b52ae',
    },
    headerTintColor: '#fff',
  }
}

export default withNavigation(SopDetailScreen)
