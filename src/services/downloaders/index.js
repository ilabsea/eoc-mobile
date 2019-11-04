import RNBackgroundDownloader from 'react-native-background-downloader'
import RNFS from 'react-native-fs'

export const download = (remoteUrl, localUrl, digest) => {
  return RNBackgroundDownloader.download({
    id: digest,
    url: remoteUrl,
    destination: localUrl
    })
}
