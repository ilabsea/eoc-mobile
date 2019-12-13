import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import {service} from '../services';
import HeaderComponent from '../components/HeaderComponent';
import RenderComponent from './RenderComponent';

// TOREMV
YellowBox.ignoreWarnings(['Remote debugger', 'Warning', 'Require cycle']);

const HeaderSearch = ({ handleSearch, handleQ }) => {
  return <View style={{ flex: 1, 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center' }}>

      <TextInput 
        onSubmitEditing={ handleSearch }
        style={{ 
          fontSize: 21, 
          flex: 1,
          margin:0, 
          padding:0, 
          width: '100%', }}
        placeholder="Search"
        autoFocus={true}
        placeholderTextColor= "white"
        onChangeText={(keyword) => handleQ(keyword) } />

    <Button 
      transparent 
      onPress={() => Alert.alert('search') }>
      <Icon name="ios-search" />
    </Button>
  </View>
}

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
