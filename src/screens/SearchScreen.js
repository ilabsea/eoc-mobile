import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import {service} from '../services';
import HeaderComponent from '../components/HeaderComponent';
import RenderComponent from './RenderComponent';
import {connect} from 'react-redux';

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
    service.translateManager.translate(this.props.lang);
    this.setNavigationParams();
  }

  componentDidMount() {
    service.firebaseManager.setCurrentScreen('SearchScreen', 'SearchScreen');
  }

  handleSearch = () => {
    this.setState({shouldLoad: true}, () => {
      this.renderer.current.handleSearch();
    });
  };

  render() {
    let {q, shouldLoad} = this.state;
    return (
      <RenderComponent ref={this.renderer} q={q} shouldLoad={shouldLoad} />
    );
  }
}

const mapStateToProps = state => {
  let {lang} = state;
  return {lang};
};

export default connect(mapStateToProps)(SearchScreen);
