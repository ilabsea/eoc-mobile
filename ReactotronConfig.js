import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Emergency Operation Center',
  })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;
