import React, {Component} from 'react';
import {YellowBox, View, StyleSheet} from 'react-native';

import {connectActionSheet} from '@expo/react-native-action-sheet';
import i18n from 'i18n-js';
import {connect} from 'react-redux';

import {H3, Button, Icon} from 'native-base';

import {service} from '../services';
import RenderComponent from './RenderComponent';
import Root from '../components/Root';
import codePush from 'react-native-code-push';

import {setLang} from '../actions';

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger', 'Warning', 'Require cycle']);

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <H3 style={styles.headerText}>{navigation.getParam('title')}</H3>
          <View style={styles.dirRow}>
            <Button transparent onPress={() => navigation.navigate('Search')}>
              <Icon name="ios-search" style={styles.headerText} />
            </Button>
            <Button transparent onPress={navigation.getParam('changeLanguage')}>
              <Icon name="ios-globe" style={styles.headerText} />
            </Button>
          </View>
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
  }

  _onOpenActionSheet = () => {
    const options = ['English', 'ខ្មែរ', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 2;
    const getLang = {
      0: 'en',
      1: 'km',
      2: 'en',
    };
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: 'ជ្រើសរើសភាសា/Choose language:',
      },
      buttonIndex => {
        const lang = getLang[buttonIndex];
        this.props.setLang(lang);
        service.translateManager.translate(lang);
        this.props.navigation.setParams({title: i18n.t('guideline')});
      },
    );
  };

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

  componentDidMount() {
    const {navigation, lang} = this.props;
    service.translateManager.translate(lang);
    navigation.setParams({
      changeLanguage: this._onOpenActionSheet,
      title: i18n.t('guideline'),
    });
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
  dirRow: {
    flexDirection: 'row',
  },
});

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};
const HomeConnect = connectActionSheet(HomeScreen);
const mapStateToProps = state => {
  let {lang} = state;
  return {lang};
};
const mapDispatchToProps = {setLang};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(codePush(codePushOptions)(HomeConnect));
