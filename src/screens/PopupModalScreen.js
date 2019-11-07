import React from 'react'
import { Container, Header, Left, Button, 
          Icon, Body, Text, Title, Right } from 'native-base'

class PopupModalScreen extends React.Component {
  render() {
    return <Container>
      <Header>
        <Left>
          <Button transparent onPress={ () => this.props.navigation.goBack() }>
            <Icon name="md-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Filter</Title>
        </Body>
        <Right />
      </Header>

      
      <Text>Filter screen</Text>
      
    </Container>
  }
}

export default PopupModalScreen