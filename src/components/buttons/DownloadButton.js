import React from 'react';
import {Button, Icon, Text} from 'native-base';
import {icons} from '../../constants/icons';

const DownloadButton = ({handleDownload, isDisabled, isTransparent = true}) => {
  return isTransparent ? (
    <Button transparent disabled={isDisabled} onPress={handleDownload}>
      <Icon style={icons.styles} type={icons.type} name={icons.name.download} />
    </Button>
  ) : (
    <Button
      full
      primary
      iconLeft
      disabled={isDisabled}
      onPress={handleDownload}>
      <Icon style={icons.styles} type={icons.type} name={icons.name.download} />
      <Text>Download</Text>
    </Button>
  );
};
export default DownloadButton;
