import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Container, Content, Header, 
      Left, Right, Body, Title, Button, Icon, H1 } from 'native-base'
import DownloadComponent from '../components/DownloadComponent';
import { service } from '../services'
import { regexHtml } from '../config/utils' 

class SopDetailScreen extends React.Component {
  static navigationOptions = {
    title: "Detail"
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    service.firebaseManager.setCurrentScreen('SopDetailScreen', 'SopDetailScreen')
  }

  render() {
    let item = this.props.navigation.getParam('item')

    return <Container>
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