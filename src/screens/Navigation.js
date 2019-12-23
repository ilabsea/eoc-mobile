import React from 'react';
import Reactotron from '../../ReactotronConfig';
import i18n from 'i18n-js';

// Navigation
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import database from '../models/database';

// State
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';

// Screens
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import CategoryScreen from './CategoryScreen';
import SopDetailScreen from './SopDetailScreen';
import Notification from './NotificationScreen';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['lang'],
};

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    Category: {
      screen: CategoryScreen,
    },
    SopDetail: {
      screen: SopDetailScreen,
      path: 'eoc://detail/:sopId',
      navigationOptions: {title: i18n.t('detail')},
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'float',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: 'white',
    },
  },
);

let Navigate = createAppContainer(
  createDrawerNavigator(
    {
      Root: {
        screen: StackNavigator,
        path: 'eoc://',
      },
    },
    {
      Notification: {
        screen: Notification,
        navigationOptions: {title: 'Notifications'},
      },
    },
    {
      initialRouteName: 'Root',
    },
  ),
);

const initialState = {database, lang: i18n.currentLocale()};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANG':
      return {lang: action.lang};
    default:
      return state;
  }
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export const createNavigation = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ActionSheetProvider>
          <Navigate />
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};
