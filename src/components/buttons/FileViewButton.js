import React from 'react'
import { Button, Icon } from 'native-base'
import { Alert } from 'react-native'

import { icons } from '../../constants/icons'

const FileViewerButton = () => (
  <Button transparent
          onPress={ () => Alert.alert('file view') }>
    <Icon style={icons.styles} type={icons.type} name={icons.name.fileView} />
  </Button>
)
export default FileViewerButton