import React from 'react';
import { Container, Button, Content, Header, Left, H3, H1,
          Right, Body, Title, Icon, List } from 'native-base'

import { service } from '../services';
import { withNavigation } from 'react-navigation'
import ListComponent from '../components/ListComponent'

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

  render() {
    let { navigation } = this.props
    let { sops, children } = this.state
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
          {
            sops.length > 0 ? <H3>Sops:</H3> : null
          }
          <List>
            {
              this.state.sops.map( c => {
                return <ListComponent key={c.id} item={c} 
                                typeIcon="insert-drive-file" 
                                actionIcon="file-download" 
                                action="download"
                                navigation={navigation} /> })
            }
          </List>

          {
            sops.length > 0 ? <H3>Children:</H3> : null
          }
          <List>
            {
              
              this.state.children.map( c => {
                return <ListComponent key={c.id} item={c} 
                          typeIcon="folder" 
                          actionIcon="arrow-forward" 
                          action="navigate"
                          navigation={navigation} /> })
              
            }
          </List>

          {
            (sops.length==0) && (children.length==0) ? <H1>No items</H1> : null
          }
          
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
