import React, {Component} from 'react';
import {YellowBox, Keyboard, Alert} from 'react-native';
import {service} from '../services';
import HeaderComponent from '../components/HeaderComponent';
import RenderComponent from './RenderComponent';
import Reactotron from 'reactotron-react-native';
import {connect} from 'react-redux';
import i18n from 'i18n-js';

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger', 'Warning', 'Require cycle']);

class SearchScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('headerTitle'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {q: '', shouldLoad: false};
    this.handleSearch = this.handleSearch.bind(this);
    this.renderer = null;
  }

  setNavigationParams = () => {
    this.props.navigation.setParams({
      headerTitle: () => (
        <HeaderComponent
          handleSearch={this.handleSearch}
          handleQ={q => this.setState({q})}
        />
      ),
    });
  };

  componentWillMount() {
    this.setNavigationParams();
  }

  componentDidMount() {
    service.firebaseManager.setCurrentScreen('SearchScreen', 'SearchScreen');
  }

  handleSearch = () => {
    let {isConnected} = this.props;
    if (isConnected) {
      this.setState({shouldLoad: true}, () => {
        this.renderer.handleSearch();
        if (this.state.q.length > 0) {
          Keyboard.dismiss();
        }
      });
    } else {
      Alert.alert(i18n.t('offline'), i18n.t('tryLater'));
    }
  };

  render() {
    let {q, shouldLoad} = this.state;
    return (
      <RenderComponent
        onRef={elem => (this.renderer = elem)}
        q={q}
        shouldLoad={shouldLoad}
      />
    );
  }
}

const mapStateToProps = ({net}) => ({
  isConnected: net.isConnected,
});

export default connect(mapStateToProps)(SearchScreen);
