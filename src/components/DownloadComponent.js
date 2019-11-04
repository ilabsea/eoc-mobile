import React from 'react'
import { View } from 'react-native'

import { fileInfo } from '../config/utils'
import { service } from '../services'

import DownloadControl from './DownloadController'

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

    this.handleDownload = this.handleDownload.bind(this)
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
          this.setState({ isDisabled: true, expectedBytes, status: '__BEGIN__'})
        })
        .progress((progressedBytes) => {
          this.setState({ status: '__PROGRESS__', progressedBytes })
        })
        .done(() => {
          this.saveToLocalDB()
          this.setState({ isDisabled: false, localUrl, status: '__DONE__' })
        })
        .error( (error) => {
          this.setState({ status: '__ERROR__', error }) 
          service.toastManager.show(`${error}, please try again later!`)
        })
    }
  }

  async saveToLocalDB() {
    let { database, item } = this.props
    let collection = await database.collections.get('downloads')

    let { expectedBytes } = this.state
    let { fileName } = fileInfo(item)

    await database.action(async () => {
      await collection.create(dl => {
        dl.name = fileName
        dl.size = expectedBytes
      })
    })
  }

  render() {
    return <DownloadControl 
              {...this.state} 
              handleDownload={this.handleDownload} />
  }
}

export default DownloadComponent