import RNBackgroundDownloader from 'react-native-background-downloader'
import RNFS from 'react-native-fs'
import { fileInfo } from '../../config/utils'
import RNFetchBlob from 'rn-fetch-blob'
import { service } from '..'

export const download = (remoteUrl, localUrl, digest) => {
  return RNBackgroundDownloader.download({
    id: digest,
    url: remoteUrl,
    destination: localUrl
    })
}

export const inTrayDownload = (remoteUrl, fileName, mime) => {
  let dirs = RNFetchBlob.fs.dirs
  let { android } = RNFetchBlob

  RNFetchBlob
    .config({
      fileCache : true,
      addAndroidDownloads: {
        useDownloadManager : true,
        title : `Download ${fileName}`,
        notification: true,
        mime: mime,
        description: 'File downloaded using Download Manager',
        path : dirs.DCIMDir + fileName,
        mediaScannable : true,
      },
    })
    .fetch('GET', remoteUrl)
    .then((res) => {
      service.toastManager.show("Download completed!", {android, path: res.path(), mime})
    })
    .then(() => {})
    .catch((err) => {
      service.toastManager.show(err)
    })
}
