import React from 'react';
import { Container, Button, Content, Header, Left, H3, H1,
          Right, Body, Title, Icon, List } from 'native-base'
          
import { service } from '../services';
import { withNavigation } from 'react-navigation'
import ListComponent from '../components/ListComponent'

import DownloadComponent from '../components/DownloadComponent'
import NavigateComponent from '../components/NavigateComponent'

const ListGroup = ({title, data, Component, database, navigation, color, typeIcon}) => {
  return <>
    { data.length > 0 ? <H3>{title}:</H3> : null }
    <List>
      {
        data.map( item => {
          return <ListComponent key={item.id} 
                          item={item} 
                          database={database}
                          typeIcon={typeIcon}
                          color={color}
                          actionComponent={<Component item={item} />}
                          navigation={navigation} /> })
      }
    </List>
  </>
}
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
    } catch( e) {
      console.log(e)
    } finally {
      this.setState({
        isFetching: false
      })
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
          <ListGroup 
            {...this.props}
            title='Sops' 
            typeIcon="insert-drive-file" 
            color='#b1090c'
            data={sops} 
            Component={DownloadComponent}/>

          <ListGroup 
            {...this.props}
            title='Subs' 
            typeIcon="folder" 
            color='#f39c24'
            data={children} 
            Component={NavigateComponent}/>
          
          {
            <EmptyList 
              isFetching={isFetching} 
              data={[...sops, ...children]} />
          }
        </Content>
      </Container>
    )
  }
}

export default withNavigation(CategoryScreen)
