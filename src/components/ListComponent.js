import React from 'react'
import styleUtils from '../config/styles'
import moment from 'moment'
import { View, Text, Alert } from 'react-native'
import { Button, Left, H3,
  Right, Body, Icon, ListItem } from 'native-base'
import * as config from '../config/connectionBase'
import { service } from '../services'
import { basename } from '../config/utils'
import { Q, withObservables } from "@nozbe/watermelondb"
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'

class ListComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      TextProgress: ''
    }

    this.expectedBytes = 0
  }
  
  init = {
    navigate: () => this.handleNavigation(),
    download: () => this.handleDownload()
  }

  async componentDidMount() {
    let db = this.props.database
    let downloadsCollection = db.collections.get('downloads')
    let { name } = this.props.item

    const collection = await downloadsCollection.query(Q.where('name', name)).fetch()
    if( collection.length > 0 ) {
      console.log(collection)
      this.setState({
        isOpen: true
      })
    }
  }

  handleDownload = () => {
    let { item } = this.props

    let remoteURL = `${config.host.staging}:${config.port}${item.file.url}`
    let filename = basename(remoteURL)

    let digest = filename.match(/\w+/)[0]
    service.downloadManager
      .download(remoteURL, digest, filename)
      .begin((expectedBytes) => {
        this.setState({
          TextProgress: `${expectedBytes} b`
        })
        this.expectedBytes = expectedBytes
        console.log(`Going to download ${expectedBytes} bytes!`);
      }).progress((percent) => {
        this.setState({
          TextProgress: `${percent * 100}%`
        })
        console.log(`Downloaded: ${percent * 100}%`);
      }).done(async () => {
        this.saveToLocalDB(item.name, this.expectedBytes, filename)
        // service.toastManager.show(`Downloaded completed!`)
        console.log(`Download ${filename} is done!`);
        this.setState({
          TextProgress: ``
        })
      }).error((error) => {
        console.log('Download canceled due to error: ', error);
      });
  }

  async saveToLocalDB(name, size, filename) {
    console.log('saving to local')

    let db = this.props.database
    let downloadsCollection = await db.collections.get('downloads')

    let downloadDir = `${RNFS.ExternalStorageDirectoryPath}/Download`
    let localURL = `${downloadDir}/${filename}`

    console.log('size', size)

    await db.action(async () => {
      await downloadsCollection.create(dl => {
        dl.name = name
        dl.size = size
        dl.localUrl = localURL
      })
      console.log('new download', name, localURL)
      this.setState({
        isOpen: true
      })
    })
  }

  handleNavigation = () => {
    let { item } = this.props
    this.props.navigation.push('SopDetail', { sopGuide: item, id: item.id }) 
  }

  async handleView(name) {
    let db = this.props.database
    let downloadsCollection = db.collections.get('downloads')
    // let result = await downloadsCollection.query().fetch()

    const collection = await downloadsCollection.query(Q.where('name', name)).fetch()

    if( collection.length > 0 ) {

      FileViewer.open(collection[0]._raw.local_url)
      .then(() => {
        console.log('success')
      })
      .catch(error => {
        console.log(error.message)
        service.toastManager.show(error.message)
      });
    }
  }

  performance = (action) => {
    this.init[action]()
  }

  render() {
    let { item, typeIcon, actionIcon, navigation, action, color } = this.props
    let { name, created_at } = item

    return <ListItem thumbnail>
    <Left>
      <Button transparent style={styleUtils.btnIcon}>
        <Icon type="MaterialIcons" style={{ fontSize:42, color: color }} name={typeIcon} />
      </Button>
    </Left>

    <Body>
      <View>
        <H3>{name}</H3>

        <View style={{ flexDirection: 'row', alignItems:'center', marginTop: 10 }}>
          <Icon name="md-time" style={{ fontSize: 20, marginRight: 5, color: "#666666" }} />
          <Text style={{color: "#666666"}}>
            { moment(created_at).fromNow() }
          </Text>
        </View>
      </View>
    </Body>

    <Right>
      <Text>{this.state.TextProgress}</Text>
      {
        action == 'download' ? 
        this.state.isOpen ?
          <Button transparent 
                  onPress={() => this.handleView(name) }>
            <Text>Open</Text>
          </Button>
          :
          <Button transparent
                  onPress={() => this.performance(action) }>
                    <Icon type="MaterialIcons" name={actionIcon} />
          </Button> 
        :
        // navigate
        <Button transparent
                onPress={() => this.performance(action) }>
          <Icon type="MaterialIcons" name={actionIcon} />
        </Button>
      }
      
    </Right>

  </ListItem>
  }
}

export default ListComponent