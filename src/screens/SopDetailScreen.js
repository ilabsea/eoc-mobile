import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Content, Header, Left, Right, Body, Title, Icon } from 'native-base'
import moment from 'moment';
import { typeIcon } from '../config/utils'

const SopDetailScreen = props => {
  const sopGuide = props.navigation.getParam('sopGuide');
  let { type, icon, color } = typeIcon(sopGuide.document_type)

  return (
    <Container>
      <Header>
        <Left>
          <Button onPress={ () => props.navigation.goBack() }>
            <Icon name="md-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Sop detail</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <View style={styles.screen}>
          <Icon type={type} style={{ color, fontSize:30 }} name={ icon } />
          <Text>{ sopGuide.tags }</Text>
          <Text>created date: { moment(sopGuide.created_at).fromNow() }</Text>
        </View>
      </Content>
    </Container>
  );
};

SopDetailScreen.navigationOptions = navigationData => {
  const sopGuide = navigationData.navigation.getParam('sopGuide');

  return {
    headerTitle: sopGuide.name,
    headerStyle: {
      backgroundColor: '#6b52ae',
    },
    headerTintColor: '#fff',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SopDetailScreen
