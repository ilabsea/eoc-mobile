import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Container, Content, Header, 
      Left, Right, Body, Title, Button, Icon, H1 } from 'native-base'
import DownloadComponent from '../components/DownloadComponent';

class SopDetailScreen extends React.Component {
  
  constructor(props) {
    super(props);
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

          <H1 style={{ marginBottom: 15 }}>{item.name}</H1>
          <Text>{item.tags}</Text>
          <Text>{item.description}</Text>

          <View style={{ flexDirection: 'row' }}>
            {
              /* <Button rounded warning 
                  style={{marginRight: 10}}
                  onPress={() => Alert.alert('favourite')}>
                  <Icon name="star" />
                </Button> */
            }

            <DownloadComponent item={item} database={database} />
          </View>
        </View>
      </Content>
    </Container>
  }
}

export default SopDetailScreen