import React from 'react'
import { View } from 'react-native'
import { Icon, List, ListItem, Text, Footer, Header, H3, Title, Button,
          Content, Container, Body, Left, Right, Subtitle } from 'native-base'
import database from '../model/db'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
import { realname } from '../config/utils'

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
    console.log('get downloads', all)
    const downloads = all.map(d => [{ id: d.id, name: d.name, localUrl: d.localUrl }])
    this.setState({ downloads })
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

  view(name) {
    let localFile = `${RNFS.DocumentDirectoryPath}/${name}`
    FileViewer.open(localFile)
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
                return <ListItem key={d[0].name}>
                  <Left>
                    <Text>{ realname(d[0].name) }</Text>
                  </Left>

                  <Right>
                    <View style={{flexDirection: 'row'}}>
                      <Button small rounded onPress={this.view.bind(this, d[0].name )}>
                        <Icon name="md-eye" />
                      </Button>
                      <Button small rounded
                              onPress={this.remove.bind(this, d[0].id )}
                              style={{ marginLeft: 5 }}>
                        <Icon name="md-remove-circle-outline" />
                      </Button>
                    </View>
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