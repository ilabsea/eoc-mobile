import React from 'react'
import { Alert, View } from 'react-native'
import { Icon, List, ListItem, Text, Header, Title, Button,
          Content, Container, Body, Left, Right } from 'native-base'
import database from '../models/db'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
import { realname } from '../config/utils'
import { withNavigation } from 'react-navigation'
import { ConfirmDialog } from 'react-native-simple-dialogs'
import Toast from 'react-native-root-toast'

class DownloadScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      dialogVisible: false,
      downloads: []
    }

    this.downloadCollection = database.collections.get('downloads') // redux
    this.getAllDownloads = this.getAllDownloads.bind(this)
  }

  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      'didFocus', payload => {
        console.log('didFocus', payload);
        this.getAllDownloads()
      }
    );
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove()
  }

  getAllDownloads = async () => {
    const all = await this.downloadCollection.query().fetch()
    console.log('get downloads', all)
    const downloads = all.map(d => [{ id: d.id, name: d.name, localUrl: d.localUrl }])
    this.setState({ downloads })
  }

  async remove(id) {
    this.setState({
      id: id,
      dialogVisible: true
    })
  }

  async destroy() {
    await this.downloadCollection.find(this.state.id)
      .then( async (r) => {
        await database.action(async () => {
          await r.markAsDeleted()
          await r.destroyPermanently()
        })
        this.setState({ id: 0 })
        this.getAllDownloads()

        let toast = Toast.show('Removed one item', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });

        setTimeout(function () {
          Toast.hide(toast);
        }, 3000);

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
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Title>Found { downloads.length } files</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <ConfirmDialog
              title="Confirm Dialog"
              message="Are you sure about that?"
              visible={this.state.dialogVisible}
              onTouchOutside={() => this.setState({dialogVisible: false})}
              positiveButton={{
                  title: "YES",
                onPress: () => {
                  this.destroy()
                  this.setState({ dialogVisible: false })
                }
              }}
              negativeButton={{
                  title: "NO",
                  onPress: () => this.setState({ dialogVisible: false })
              }} />
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

export default withNavigation(DownloadScreen)