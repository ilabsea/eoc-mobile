import React, {Component} from 'react';
import {YellowBox, Keyboard} from 'react-native';
import {service} from '../services';
import HeaderComponent from '../components/HeaderComponent';
import RenderComponent from './RenderComponent';

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
    this.renderer = React.createRef();
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
    this.setState({shouldLoad: true}, () => {
      this.renderer.current.handleSearch();
      if (this.state.q.length > 0) {
        Keyboard.dismiss();
      }
    });
  };

  render() {
    let {q, shouldLoad} = this.state;
    return (
      <RenderComponent ref={this.renderer} q={q} shouldLoad={shouldLoad} />
    );
  }
}

export default SearchScreen;
