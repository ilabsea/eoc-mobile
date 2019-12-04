// @flow
import firebase from 'react-native-firebase';

export default async (message) => {
    // handle your message
    console.log('remote message: ', message)
    
    return Promise.resolve();
}