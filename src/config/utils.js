import VersionNumber from 'react-native-version-number';
import * as config from '../config/connectionBase';
import RNFS from 'react-native-fs';

export const regexHtml = /(<([^>]+)>)/gi;
export const fileInfo = source => {
  let remotePath = source.file.url;
  let fileName = _basename(remotePath);
  let downloadDir = `${RNFS.ExternalStorageDirectoryPath}/Download`;
  let digest = fileName.match(/\w+/)[0];

  return {
    remoteUrl: `${config.uri}${remotePath}`,
    sopName: source.name,
    fileName: fileName,
    fileDigest: digest,
    localUrl: `${downloadDir}/${fileName}`,
    mime: MIMES[_extname(fileName)],
  };
};
export const iconMapping = docType => {
  const type = 'MaterialIcons';

  let doc = {
    Sop: {
      type,
      typeIcon: 'picture-as-pdf',
      actionIcon: 'file-download',
      action: 'download',
      color: '#b1090c',
    },

    Category: {
      type,
      typeIcon: 'folder',
      actionIcon: 'arrow-forward',
      action: 'navigate',
      color: '#f39c24',
    },
  };
  return doc[docType];
};
export const appVersion = VersionNumber.appVersion;
export const realname = path => {
  const reg = /-(.*)\.{0,3}$/.exec(path);
  return reg[1];
};

// private
const MIMES = {
  pdf: 'application/pdf',
  zip: 'application/zip',
};
const _array_reverse = (str, splitter) => str.split(splitter).reverse();
const _basename = path => _array_reverse(path, '/')[0];
const _extname = name => _array_reverse(name, '.')[0];
