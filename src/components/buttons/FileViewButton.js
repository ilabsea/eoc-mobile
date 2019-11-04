import React from 'react'
import { Button, Icon } from 'native-base'
import FileViewer from 'react-native-file-viewer'

import { icons } from '../../constants/icons'
import { service } from '../../services'

const viewFile = (localUrl) => {
  FileViewer.open(localUrl)
    .then(() => {
    })
    .catch(error => {
      let { message } = error
      service.toastManager.show(message)
    })
}

const FileViewerButton = ({ localUrl }) => (
  <Button transparent
          onPress={ () => viewFile(localUrl) }>
    <Icon style={icons.styles} type={icons.type} name={icons.name.fileView} />
  </Button>
)
export default FileViewerButton