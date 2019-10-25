import RNBackgroundDownloader from 'react-native-background-downloader'
import RNFS from 'react-native-fs'

export const download = (remoteURL, filename) => {
  let downloadDir = `${RNFS.ExternalStorageDirectoryPath}/Download`
  let localURL = `${downloadDir}/${filename}`

  return RNBackgroundDownloader.download({
    id: filename,
    url: remoteURL,
    destination: localURL
    })
}
