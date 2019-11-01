import React from 'react'
import { Button, Icon } from 'native-base'
import { icons } from '../../constants/icons'

const DownloadButton = ({ handleDownload, isDisabled }) => {
  return <Button transparent
          disabled={isDisabled}
          onPress={ handleDownload }>
    <Icon style={icons.styles} 
          type={icons.type} 
          name={icons.name.download} />
  </Button>
}
export default DownloadButton