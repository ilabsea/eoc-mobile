import React from 'react'
import { Icon, List, ListItem, Text, Footer, Header, H3, Title, Button,
          Content, Container, Body, Left, Right, Subtitle } from 'native-base'
import database from '../model/db'

class DownloadScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      downloads: []
    }

    this.downloadCollection = database.collections.get('downloads')
    this.getAllDownloads = this.getAllDownloads.bind(this)
  }

  componentDidMount() {
    this.getAllDownloads()
  }

  getAllDownloads = async () => {
    const all = await this.downloadCollection.query().fetch()
    const downloads = all.map(d => [{ id: d.id, name: d.name, localUrl: d.localUrl }])
    this.setState({ downloads })
  }

  async gen() {
    const db = await database.action(async () => {
      const newDownload = await this.downloadCollection.create(dl => {
        dl.remoteUrl = 'test remote url'
        dl.localUrl = 'test local url'
        dl.name = 'test name'
      })
      console.log('created')
    })
  }

  async remove(id) {
    await this.downloadCollection.find(id)
      .then( async (r) => {

        await database.action(async () => {
          await r.markAsDeleted()
          await r.destroyPermanently()
        })

        console.log('removed')
        this.getAllDownloads()
      })
      .catch( e => console.log('error caught: ', e))
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
          <Button full onPress={ this.gen.bind(this) }>
            <Text>Gen.</Text>
          </Button>

          <List>
            {
              downloads.map ( d => {
                return <ListItem key={d[0].name}>
                  <Left>
                    <Text>{ d[0].name }</Text>
                  </Left>
                  <Right>
                    <Button small danger onPress={this.remove.bind(this, d[0].id )}>
                      <Icon name="md-remove-circle-outline" />
                    </Button>
                  </Right>
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