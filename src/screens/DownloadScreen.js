import React from 'react'
import { Icon, List, ListItem, Text, Footer, Header, H3, Title,
          Content, Container, Body, Left, Right, Subtitle } from 'native-base'
import database from '../model/db'

class DownloadScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      downloads: []
    }

    this.downloadCollection = database.collections.get('downloads')
  }

  componentDidMount() {
    this.getAllDownloads()
  }

  getAllDownloads = async () => {
    const all = await this.downloadCollection.query().fetch()
    const downloads = all.map(d => [{ name: d.name, localUrl: d.localUrl }])
    this.setState({ downloads })
  }

  render() {
    const { downloads } = this.state

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Found { downloads.length } files</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <List>
            {
              downloads.map ( d => {
                return <ListItem>
                  <Text>{ d[0].name }</Text>
                </ListItem>
              })
            }
          </List>
        </Content>
      </Container>
    )
  }
}

DownloadScreen.navigationOptions = {
  header:null,
  drawerLabel: 'Download',
  drawerIcon: ({ tintColor }) => (
    <Icon name="md-download" />
  ),
};

export default DownloadScreen