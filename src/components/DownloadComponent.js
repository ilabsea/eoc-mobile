import React from 'react'
import { View } from 'react-native'

import { fileInfo, basename } from '../config/utils'
import { service } from '../services'

// todo: add global config
// global : color, icon, ...
// how to embed information, can still view even file rename
// i18n

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
                              fileName={ basename(localUrl) }
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

  handleDownload () {
    let { item } = this.props
    let { remoteUrl, localUrl, fileDigest } = fileInfo(item)

    this.setState({ isDisabled: true })

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
      })
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