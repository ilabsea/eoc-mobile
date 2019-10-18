import RNBackgroundDownloader from 'react-native-background-downloader'
import RNFS from 'react-native-fs'

export const download = (remoteURL, filename) => {
  let downloadDir = `${RNFS.ExternalStorageDirectoryPath}/Download`
  let localURL = `${downloadDir}/${filename}`

  RNBackgroundDownloader.download({
    id: 'TEST_ID',
    url: remoteURL,
    destination: localURL
    }).begin((expectedBytes) => {
      console.log(`Going to download ${expectedBytes} bytes!`);
    }).progress((percent) => {
      console.log(`Downloaded: ${percent * 100}%`);
    }).done(async () => {
      console.log(`Download ${filename} is done!`);
    }).error((error) => {
      console.log('Download canceled due to error: ', error);
    });
}
