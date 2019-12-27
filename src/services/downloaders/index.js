import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFetchBlob from 'rn-fetch-blob';
import {service} from '..';
import i18n from 'i18n-js';
import moment from 'moment';

moment.locale(i18n.currentLocale());

export const download = (remoteUrl, localUrl, digest) => {
  return RNBackgroundDownloader.download({
    id: digest,
    url: remoteUrl,
    destination: localUrl,
  });
};

export const inTrayDownload = (remoteUrl, fileName, mime) => {
  let dirs = RNFetchBlob.fs.dirs;
  let {android} = RNFetchBlob;
  let time = moment().format('LLLL');

  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      title: i18n.t('downloadTitle', {fileName}),
      notification: true,
      mime: mime,
      description: i18n.t('downloadDescription', {time}),
      path: dirs.DCIMDir + fileName,
      mediaScannable: true,
    },
  })
    .fetch('GET', remoteUrl)
    .then(res => {
      service.toastManager.show(i18n.t('downloadComplete'), {
        android,
        path: res.path(),
        mime,
      });
    })
    .then(() => {})
    .catch(err => {
      service.toastManager.show(err);
    });
};
