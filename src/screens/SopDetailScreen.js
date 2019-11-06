import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Container, Content, Header, 
      Left, Right, Body, Title, Button, Icon, H1 } from 'native-base'
import DownloadComponent from '../components/DownloadComponent';
import { service } from '../services'
import { regexHtml } from '../config/utils' 

class SopDetailScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    service.firebaseManager.setCurrentScreen('SopDetailScreen', 'SopDetailScreen')
  }

  render() {
    let { navigation } = this.props
    let item = navigation.getParam('item')
    let database = navigation.getParam('database')

    return <Container>
      <Header>
        <Left>
          <Button transparent 
                  onPress={ () => navigation.goBack() }>
            <Icon name="md-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{item.name}</Title>
        </Body>
        <Right />
      </Header>

      <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>

          <H1 style={{ marginBottom: 15 }}>{item.name}</H1>
          <Text>{item.tags}</Text>
          <Text style={{ fontSize: 18, lineHeight: 30, textAlign: 'center' }}>
            {item.description.replace(regexHtml, '')}
          </Text>
        </View>
      </Content>
    </Container>
  }
}

export default SopDetailScreen