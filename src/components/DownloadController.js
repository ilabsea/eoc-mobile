import React from 'react'

import FileViewButton from './buttons/FileViewButton'
import DownloadButton from './buttons/DownloadButton'
import ProgressButton from './buttons/ProgressButton'

const DownloadControl = (props) => {
  switch(props.status) {
    case '__BEGIN__':
    case '__PROGRESS__':
      return <ProgressButton progress={props.progressedBytes}/>
    case '__DONE__':
      return <FileViewButton localUrl={props.localUrl}/>
    default:
      return <DownloadButton  handleDownload={props.handleDownload} 
                              isTransparent={props.isTransparent}
                              isDisabled={props.isDisabled} />
  }
}

export default DownloadControl