import React from 'react'
import { View, Alert } from 'react-native'
import { Container, Content, Text, Header, 
      Left, Right, Body, Title, Button, Icon, H1 } from 'native-base'

class SopDetailScreen extends React.Component {
  render() {
    let item = this.props.navigation.getParam('item')

    return <Container>
      <Header>
        <Left>
          <Button transparent 
                  onPress={ () => this.props.navigation.goBack() }>
            <Icon name="md-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{item.name}</Title>
        </Body>
        <Right />
      </Header>

      <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <H1 style={{ marginBottom: 15 }}>{item.name}</H1>

          <Button bordered info onPress={() => Alert.alert('download')}>
            <Text>Download</Text>
          </Button>
        </View>
      </Content>
    </Container>
  }
}

export default SopDetailScreen