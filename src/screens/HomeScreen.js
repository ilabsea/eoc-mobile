import React, { Component } from 'react';
import { StyleSheet, View, YellowBox } from 'react-native'
import axios from 'axios'
import * as config from '../config/connectionBase'
import moment from 'moment'
import { Container, Header, Item, Input, Left, Body, Right, 
          Button, List, ListItem, Text, Icon, H3 } from 'native-base'
import { typeIcon, basename, highlight } from '../config/utils'
import EmptyList from './EmptyList'
import { service } from '../services'


// TOREMV
YellowBox.ignoreWarnings(['Remote debugger'])

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      from: 0,
      size: 15,
      keyword: 'disease',
      data: [],
    }

    this.searchInput = React.createRef()
    this.loadMore = this.loadMore.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.handleFetch = this.handleFetch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleListPress = sopGuide => {
    this.props.navigation.navigate({
      routeName: 'SopDetail',
      params: { sopGuide },
    });
  };

  handleFetch = async (keyword) => {
    let { from, size } = this.state
    let uri = `${config.host.staging}:${config.port}/${config.sops_path}`
    let params = { keyword, from, size }

    try {
      let data = await axios.get(uri, { params })
                    .then( resp => resp.data )
                    .catch( error => error)

      if( data.length > 0 ) {
        this.setState( (prev) => {
          return {
            data: [...prev.data, ...data],
            from: prev.from + prev.size
          }
        })
      }
      
      this.setState({isFetching: false})
    } catch ( e ) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.searchInput.current._root.focus()
  }

  loadMore = () => {
    this.setState({isFetching: true})
    this.handleFetch(this.state.keyword)
  }

  handleSearch = () => {
    const { keyword } = this.state

    if( keyword != '' ) {
      this.setState({ from: 0, data: [], isFetching: true }, () => {
        this.handleFetch(keyword)
      })
    }
  }

  _renderSubItem = (esHighlightStr, tag, fallbackComponent) => {
    return esHighlightStr ? 
            highlight( esHighlightStr[0], tag ) 
            : fallbackComponent
  }

  handleDownload(item) {
    let remoteURL = `${config.host.staging}:${config.port}${item.file.url}`
    let filename = basename(remoteURL)

    service.downloadManager.download( remoteURL, filename )
    service.toastManager.show(`Downloaded completed!`)
  }

  renderRow = (item) => {
    let { document_type } = item._source
    let { type, icon, color } = typeIcon(document_type)
    let { name, tags } = item.highlight

    return (
      <ListItem thumbnail>
        <Left>
          <Button transparent style={styles.btnIcon}>
            <Icon type={type} style={{ color, fontSize:42 }} name={ icon } />
          </Button>
        </Left>
        <Body>
          <View>
            <Text>
              { this._renderSubItem(name, H3, <H3>{item._source.name}</H3>) }
            </Text>
            {
              tags ?  <Text> tags: { this._renderSubItem(tags, Text, null) } </Text>  : null
            }

            <View style={{ flexDirection: 'row', alignItems:'center', marginTop: 10 }}>
              <Icon name="md-time" style={{ fontSize: 20, marginRight: 5, color: "#666666" }} />
              <Text style={{color: "#666666"}}>
                { moment(item._source.created_at).fromNow() }
              </Text>
            </View>
          </View>
        </Body>
        <Right>
          
          {
            document_type == 'document' ?
            <Button rounded
                onPress={() => this.handleDownload(item._source)}>
              <Icon name="md-download" /> 
            </Button>
            :
            <Button rounded
                    onPress={() => this.handleListPress(item._source)}>
              <Icon name="arrow-forward" />
            </Button>
          }
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
            <Input ref={this.searchInput} 
                placeholder="Search"
                value={this.state.keyword}
                onChangeText={(keyword) => this.setState({keyword}) } />
            <Icon name="ios-search" 
                  onPress={ this.handleSearch } />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <EmptyList {...this.state} />
        <List
          dataArray={this.state.data}
          keyExtractor={item => item._source.id.toString()}
          onEndReached={this.loadMore }
          onEndReachedThreshold={0.5}
          renderRow={ this.renderRow }
        />
      </Container>
    );
  } 
};

const styles = StyleSheet.create({
  btnIcon: { 
    backgroundColor: "#fff", 
    borderWidth: 0
  },
});

export default HomeScreen;
