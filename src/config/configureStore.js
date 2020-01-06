import i18n from 'i18n-js';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from '../../ReactotronConfig';
import {offlineActionTypes, reducer as network} from 'react-native-offline';
import NetInfo from "@react-native-community/netinfo";

// database
import database from '../models/database';

const initialState = {database, lang: i18n.currentLocale()};

const langReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANG':
      return {lang: action.lang};
    default:
      return state;
  }
};

const initialNet = {is_connected: true};
const netReducer = (state = initialNet, action) => {
  switch (action.type) {
    case offlineActionTypes.CONNECTION_CHANGE:
      Reactotron.log('store: ' + action.payload);
      // if (network.is_connected !== action.payload && !action.payload) {
      //   return {is_connected: true};
      // } else {
      //   return {is_connected: false};
      // }
      return {is_connected: action.payload};
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['lang'],
};

const rootReducer = combineReducers({
  locale: persistReducer(persistConfig, langReducer),
  net: netReducer,
  network,
});

export default () => {
  // const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(rootReducer, Reactotron.createEnhancer());
  const persistor = persistStore(store);

  return {persistor, store};
};
