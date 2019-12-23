import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Container, Content, H1} from 'native-base';
import {Sop, service} from '../services';
import {regexHtml} from '../config/utils';
import i18n from 'i18n-js';

class SopDetailScreen extends React.Component {
  static navigationOptions = () => ({
    title: i18n.t('detail'),
  });

  constructor(props) {
    super(props);
    this.state = {
      item: null,
    };
  }

  async componentDidMount() {
    let item,
      {navigation} = this.props;
    let itemId = navigation.getParam('itemId');

    if (itemId) {
      let response = await Sop.find(itemId);
      item = response.data;
    } else {
      item = navigation.getParam('item');
    }

    this.setState({item});

    service.firebaseManager.setCurrentScreen(
      'SopDetailScreen',
      'SopDetailScreen',
    );
  }

  render() {
    let {item} = this.state;
    if (!item) {
      return <ActivityIndicator />;
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <View style={styles.wrapper}>
            <H1 style={styles.head}>{item.name}</H1>
            <Text>{item.tags}</Text>
            <Text style={styles.description}>
              {item.description.replace(regexHtml, '')}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    flex: 1,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  head: {
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
  },
});

export default SopDetailScreen;
