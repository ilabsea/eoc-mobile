import React from 'react';
import {fileInfo} from '../config/utils';
import {service} from '../services';
import {connect} from 'react-redux';
import DownloadControl from './DownloadController';
import i18n from 'i18n-js';
import Reactotron from 'reactotron-react-native';

class DownloadComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTransparent: props.isTransparent,
      isDisabled: false,
      status: '__IDLE__',
      progressedBytes: 0.0,
      error: null,
      expectedBytes: 0.0,
      localUrl: '',
    };

    this.handleDownload = this.handleDownload.bind(this);
  }

  async handleDownload() {
    let granted = await service.permissionManager.requestStorage();
    let {item} = this.props;

    if (!item.file.url) {
      service.toastManager.show(i18n.t('invalidRemoteUrl'));
      return false;
    }

    if (granted) {
      if (this.props.isConnected) {
        let {remoteUrl, localUrl, fileName, mime} = fileInfo(item);
        this.setState({isDisabled: true, localUrl});
        service.firebaseManager.logEvent('EVENT_DOWNLOAD', {fileName});
        service.toastManager.show(i18n.t('downloadMsg'));
        service.downloadManager.inTrayDownload(remoteUrl, fileName, mime);
      } else {
        service.toastManager.show(i18n.t('offline'));
      }
    } else {
      service.toastManager.show(i18n.t('noGrant'));
    }
  }

  async saveToLocalDB() {
    let {database, item} = this.props;
    let collection = await database.collections.get('downloads');

    let {expectedBytes} = this.state;
    let {fileName} = fileInfo(item);

    await database.action(async () => {
      await collection.create(dl => {
        dl.name = fileName;
        dl.size = expectedBytes;
      });
    });
  }

  render() {
    return (
      <DownloadControl {...this.state} handleDownload={this.handleDownload} />
    );
  }
}

const mapStateToProps = ({database, net}) => ({
  database,
  isConnected: net.isConnected,
});

export default connect(mapStateToProps)(DownloadComponent);
