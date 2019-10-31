import React from 'react'
import { Button, Icon } from 'native-base'

import { icons } from '../../constants/icons'
import { service } from '../../services'

const DownloadButton = ({ handleDownload, fileName, isDisabled }) => {
  
  service.firebaseManager.logEvent('handleDownload', { fileName })
  return <Button transparent
          disabled={isDisabled}
          onPress={ handleDownload }>
    <Icon style={icons.styles} 
          type={icons.type} 
          name={icons.name.download} />
  </Button>
}
export default DownloadButton