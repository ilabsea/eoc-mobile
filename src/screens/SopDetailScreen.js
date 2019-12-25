import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Container, Content, H1, H3} from 'native-base';
import {Sop, service} from '../services';
import {regexHtml} from '../config/utils';
import i18n from 'i18n-js';
import DownloadComponent from '../components/DownloadComponent';

class SopDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <H3 style={styles.headerText}>{i18n.t('detail')}</H3>
          <DownloadComponent
            item={navigation.getParam('item')}
            isTransparent={false}
          />
        </View>
      ),
    };
  };

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

    navigation.setParams({item});
  }

  render() {
    let {item} = this.state;
    if (!item) {
      return <ActivityIndicator />;
    }

    return (
      <Container>
        <Content>
          <View style={styles.wrapper}>
            <H1 style={styles.head}>{item.name}</H1>
            <Text>{item.tags}</Text>
            <Text style={styles.description}>
              {item.description && item.description.replace(regexHtml, '')}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  headerText: {
    lineHeight: 30,
    color: '#FFF',
  },
});

export default SopDetailScreen;
