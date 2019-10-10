import React from 'react'
import { View } from 'react-native'
import { Icon, List, ListItem, Text } from 'native-base'
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
    return (
      <View>
        <Text>Found { this.state.downloads.length } downloads</Text>

        <List>
          {
            this.state.downloads.map ( d => {
              return <ListItem>
                <Text>{ d[0].name }</Text>
              </ListItem>
            })
          }
        </List>
      </View>
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