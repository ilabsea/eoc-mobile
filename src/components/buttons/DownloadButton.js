import React from 'react';
import {Button, Icon} from 'native-base';
import {icons} from '../../constants/icons';

const DownloadButton = ({handleDownload, isDisabled, isTransparent = true}) => {
  return isTransparent ? (
    <Button transparent disabled={isDisabled} onPress={handleDownload}>
      <Icon style={icons.styles} type={icons.type} name={icons.name.download} />
    </Button>
  ) : (
    <Button transparent disabled={isDisabled} onPress={handleDownload}>
      <Icon
        // eslint-disable-next-line react-native/no-inline-styles
        style={[icons.styles, {color: '#fff'}]}
        type={icons.type}
        name={icons.name.download}
      />
    </Button>
  );
};
export default DownloadButton;
