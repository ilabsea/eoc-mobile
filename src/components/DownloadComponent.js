import React from 'react'
import { View } from 'react-native'

import { fileInfo } from '../config/utils'
import { service } from '../services'

import FileViewButton from './buttons/FileViewButton'
import DownloadButton from './buttons/DownloadButton'
import ProgressButton from './buttons/ProgressButton'

const DownloadControl = ({status, progressedBytes, localUrl, handleDownload, isDisabled}) => {
  switch(status) {
    case '__BEGIN__':
    case '__PROGRESS__':
      return <ProgressButton progress={progressedBytes}/>
    case '__DONE__':
      return <FileViewButton localUrl={localUrl}/>
    default:
      return <DownloadButton  handleDownload={handleDownload} 
                              isDisabled={isDisabled} />
  }
}

class DownloadComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDisabled: false,
      status: '__IDLE__',
      progressedBytes: 0.0,
      error: null,
      expectedBytes: 0.0,
      localUrl: ''
    }
  }

  async handleDownload () {
    let granted = await service.permissionManager.requestStorage()

    if( granted ) {
      let { item } = this.props
      let { remoteUrl, localUrl, fileDigest, fileName } = fileInfo(item)

      this.setState({ isDisabled: true, localUrl })
      service.firebaseManager.logEvent('evtDownload', { fileName })

      service.downloadManager
        .download(remoteUrl, localUrl, fileDigest)
        .begin((expectedBytes) => {
          let status = '__BEGIN__'
          let isDisabled = true
          this.setState({ isDisabled, expectedBytes, status})
        })
        .progress((progressedBytes) => {
          let status = '__PROGRESS__'
          this.setState({ status, progressedBytes })
        })
        .done(() => {
          // this.saveToLocalDB(item.name, this.expectedBytes, filename)
          // service.toastManager.show(`Downloaded completed!`)
          let isDisabled = false
          let status = '__DONE__'
          this.setState({ isDisabled, localUrl, status })
        })
        .error( (error) => {
          let status = '__ERROR__'
          this.setState({ status, error }) 
          console.log('download error:', error)
        })
    }
  }


  async saveToLocalDB(fileName) {
    let { expectedBytes } = this.state
    let { database } = this.props

    // let collection = new Collection(database, 'downloads')
    // collection.save({ name: fileName, size: expectedBytes })
    
    let collection = await database.collections.get('downloads')

    // let downloadDir = `${RNFS.ExternalStorageDirectoryPath}/Download`
    // let localURL = `${downloadDir}/${filename}`
    let { localUrl } = fileInfo(file)

    await database.action(async () => {
      await collection.create(dl => {
        dl.name = name
        dl.size = expectedBytes
      })
    })
  }

  render() {
    return <View>
            <DownloadControl 
              {...this.state} 
              handleDownload={() => this.handleDownload()} />
          </View>
  }
}

export default DownloadComponent