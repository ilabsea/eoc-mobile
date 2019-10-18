import React from 'react'
import { Container, Header, Item, Icon, 
          Input, Button, Text, Content } from 'native-base'

import { basename } from '../config/utils'
import { service } from '../services'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: ''
    }
  }

  async componentDidMount() {
    await service.permissionManager.requestStorage()
  }

  render() {
    let { navigation } = this.props

    return (
      <Container>
        {/* <Header searchBar rounded>
          <Item>
            <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
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
        </Header> */}

        <Content>
          { this.props.children }
        </Content>
      </Container>
    )
  }
}

export default Root