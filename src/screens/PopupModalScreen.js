import React from 'react'
import { Container, Header, Left, Button, H1,
          Icon, Body, Text, Title, Right } from 'native-base'

class PopupModalScreen extends React.Component {
  goBack() {
    console.log(this.props)
  }

  render() {
    return <Container>
      <Header>
        <Left>
          <Button transparent onPress={ () => this.goBack() }>
            <Icon name="md-arrow-back" />
          </Button>
        </Left>
        <Body>
          <H1>Models</H1>
        </Body>
        <Right />
      </Header>
      
      <Text>Filter screen</Text>
      
    </Container>
  }
}

export default PopupModalScreen