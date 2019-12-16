import React, {Component} from 'react';
import {YellowBox, View, StyleSheet} from 'react-native';
import Config from 'react-native-config';

import axios from 'axios';
import * as config from '../config/connectionBase';
import {H3, Button, Icon} from 'native-base';

import {service} from '../services';
import RenderComponent from './RenderComponent';
import Root from '../components/Root';
import codePush from 'react-native-code-push';

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger', 'Warning', 'Require cycle']);

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <H3 style={styles.headerText}>Guidelines</H3>
          <Button transparent onPress={() => navigation.navigate('Search')}>
            <Icon name="ios-search" style={styles.headerText} />
          </Button>
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      page: 1,
      q: '',
      data: [],
    };

    // this.loadMore = this.loadMore.bind(this)
    // this.renderRow = this.renderRow.bind(this)
    this.handleFetch = this.handleFetch.bind(this);
  }

  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
    );
  }

  handleFetch = async q => {
    let {page} = this.state;
    let uri = `${config.uri}/${config.sops_path}`;
    let params = {q, page};
    let headers = {Authorization: `bearer ${Config.SERVER_SECRET_KEY_BASE}`};

    try {
      let data = await axios
        .get(uri, {params, headers})
        .then(resp => resp.data)
        .catch(error => error);

      if (data.status === 'bad_request') {
        service.toastManager.show(data.error);
      } else if (data.length > 0) {
        this.setState(prev => {
          return {
            data: [...prev.data, ...data],
            page: prev.page + 1,
          };
        });
      }

      this.setState({isFetching: false});
    } catch (error) {
      service.toastManager.show(error);
    }
  };

  componentDidMount() {
    service.firebaseManager.setCurrentScreen('HomeScreen', 'HomeScreen');
  }

  render() {
    return (
      <Root>
        <RenderComponent q="*" shouldLoad={true} />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  headerText: {
    color: '#FFF',
  },
});

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};
export default codePush(codePushOptions)(HomeScreen);
