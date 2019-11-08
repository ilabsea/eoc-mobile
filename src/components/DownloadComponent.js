import React from 'react'
import { fileInfo } from '../config/utils'
import { service } from '../services'
import { connect } from 'react-redux'
import DownloadControl from './DownloadController'

class DownloadComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isTransparent: props.isTransparent,
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
      let { remoteUrl, localUrl, fileName, mime } = fileInfo(item)
      this.setState({ isDisabled: true, localUrl })
      service.firebaseManager.logEvent('EVENT_DOWNLOAD', { fileName })

      service.downloadManager.inTrayDownload(remoteUrl, fileName, mime)
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

const mapStateToProps = (state) => {
  let { database } = state
  return { database }
}

export default connect(mapStateToProps)(DownloadComponent)