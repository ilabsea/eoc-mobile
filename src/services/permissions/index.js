import {PermissionsAndroid} from 'react-native';

// Constants
const TITLE = 'Storage Permission!';
const REQ_MESSAGE = 'App needs access to your storage to store file';

const requestStorage = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: TITLE,
        message: REQ_MESSAGE,
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const permission = {
  requestStorage,
};
