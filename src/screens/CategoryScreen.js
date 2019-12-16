import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Container} from 'native-base';

import {service} from '../services';

import DownloadComponent from '../components/DownloadComponent';
import NavigateComponent from '../components/NavigateComponent';
import EmptyList from './EmptyList';
import ListGroup from './ListGroup';

class CategoryScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    let title = navigation.getParam('sopGuide').name;

    return {
      title,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      sops: [],
      children: [],
    };
  }

  componentDidMount() {
    this.setState({
      isFetching: true,
    });
    this.fetchChildren();
  }

  async fetchChildren() {
    try {
      let {navigation} = this.props;
      const sopGuide = navigation.getParam('sopGuide');

      let {sops, children} = await service.apiManager.fetch_category_children(
        sopGuide.id,
      );
      this.setState({
        sops,
        children,
      });
    } finally {
      this.setState({
        isFetching: false,
      });
    }
  }

  render() {
    let {isFetching, sops, children} = this.state;

    return (
      <Container>
        {sops.length > 0 || children.length > 0 ? (
          <ScrollView style={styles.scrollView}>
            <ListGroup
              title="Sops"
              typeIcon="picture-as-pdf"
              color="#b1090c"
              data={sops}
              Component={DownloadComponent}
            />

            <View style={styles.separator} />

            <ListGroup
              title="Subs"
              typeIcon="folder"
              color="#f39c24"
              data={children}
              Component={NavigateComponent}
            />

            <View style={styles.pd20} />
          </ScrollView>
        ) : (
          <EmptyList isFetching={isFetching} data={[...sops, ...children]} />
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    marginTop: 10,
  },
  pd20: {
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
});

export default CategoryScreen;
