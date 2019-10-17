import { PermissionsAndroid } from 'react-native'

// Constants
const TITLE = 'Storage Permission!'
const REQ_MESSAGE = 'App needs access to your storage to store downloaded file'
const GRANTED_MESSAGE = 'Storage Permission Granted'
const NOT_GRANTED_MESSAGE = 'Storage Permission Not Granted'

const requestStorage = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': TITLE,
        'message': REQ_MESSAGE
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(GRANTED_MESSAGE)
    }
    else {
      console.log(NOT_GRANTED_MESSAGE);
    }
  } catch (err) {
    console.warn(err)
  }
}

export const permission = {
  requestStorage
}