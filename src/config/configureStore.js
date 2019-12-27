import i18n from 'i18n-js';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from '../../ReactotronConfig';

// database
import database from '../models/database';

const initialState = {database, lang: i18n.currentLocale()};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANG':
      return {lang: action.lang};
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['lang'],
};

export default () => {
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, Reactotron.createEnhancer());
  const persistor = persistStore(store);

  return {persistor, store};
};
