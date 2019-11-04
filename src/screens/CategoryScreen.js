import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Container, Button, Header, Left,
          Right, Body, Title, Icon } from 'native-base'
          
import { service } from '../services';
import { withNavigation } from 'react-navigation'

import DownloadComponent from '../components/DownloadComponent'
import NavigateComponent from '../components/NavigateComponent'
import EmptyList from './EmptyList'
import ListGroup from './ListGroup'

class CategoryScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      sops: [],
      children: []
    }
  }

  componentDidMount() {
    this.setState({
      isFetching: true
    })
    this.fetchChildren()
  }

  async fetchChildren() {
    try {
      let { navigation } = this.props
      const sopGuide = navigation.getParam('sopGuide')

      let { sops, children } = await service.apiManager
                                      .fetch_category_children(sopGuide.id)
      this.setState({
        sops, children
      })
    } finally {
      this.setState({
        isFetching: false
      })
    }
  }

  render() {
    let { navigation } = this.props
    let { isFetching, sops, children } = this.state
    const sopGuide = navigation.getParam('sopGuide')
    const database = navigation.getParam('database')
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

        <ScrollView style={{flex: 1, padding: 10}}>
          <ListGroup 
            title='Sops' 
            typeIcon="picture-as-pdf" 
            color='#b1090c'
            data={sops} 
            database={database}
            navigation={navigation}
            Component={DownloadComponent}/>

          <View style={styles.separator}></View>
          
          <ListGroup 
            title='Subs' 
            typeIcon="folder" 
            color='#f39c24'
            data={children} 
            database={database}
            navigation={navigation}
            Component={NavigateComponent}/>
          
          <EmptyList 
            isFetching={isFetching} 
            data={[...sops, ...children]} />
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    marginTop: 10
  }
})

export default withNavigation(CategoryScreen)
