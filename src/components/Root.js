import React from 'react'
import { Container, Header, Item, Icon, 
          Input, Button, Text } from 'native-base'
import { Alert, PermissionsAndroid } from 'react-native'
import RNBackgroundDownloader from 'react-native-background-downloader'
import RNFS from 'react-native-fs'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: ''
    }
  }

  async componentDidMount() {
    console.log('did mount')
    await this.request_storage_runtime_permission()
  }

  async request_storage_runtime_permission() {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'ReactNativeCode Storage Permission',
          'message': 'ReactNativeCode App needs access to your storage to download Photos.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  
        Alert.alert("Storage Permission Granted.");
        this.downloadImage()
        console.log(RNBackgroundDownloader.directories)

      }
      else {
  
        Alert.alert("Storage Permission Not Granted");
  
      }
    } catch (err) {
      console.warn(err)
    }
  }

  downloadImage = () => {
    let image_URL = 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg'
    let localFile = `${RNFS.ExternalStorageDirectoryPath}/Download/motorcycle.jpg`

    this.task = RNBackgroundDownloader.download({
      id: 'motorcycle-123.jpg',
      url: image_URL,
      destination: localFile
      }).begin((expectedBytes) => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      }).progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
      }).done(async () => {
        console.log('Download is done! & viewing', this.state.downloads);
      }).error((error) => {
        console.log('Download canceled due to error: ', error);
      });

    // var date = new Date();
    // var image_URL = 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg';
    // var ext = this.getExtention(image_URL);
    // ext = "." + ext[0];
    // const { config, fs } = RNFetchBlob;
    // let PictureDir = fs.dirs.PictureDir
    // let options = {
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     path: PictureDir + "/image_" + Math.floor(date.getTime()
    //       + date.getSeconds() / 2) + ext,
    //     description: 'Image'
    //   }
    // }
    // config(options).fetch('GET', image_URL).then((res) => {
    //   Alert.alert("Image Downloaded Successfully.");
    // });
  }

  render() {
    let { navigation } = this.props

    return (
      <Container>
        <Header searchBar rounded>
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
        </Header>
      </Container>
    )
  }
}

export default Root