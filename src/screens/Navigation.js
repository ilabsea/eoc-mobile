import React from 'react';
import {ReduxNetworkProvider} from 'react-native-offline';

// Navigation
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

// State
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// Screens
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import CategoryScreen from './CategoryScreen';
import SopDetailScreen from './SopDetailScreen';

import configureStore from '../config/configureStore';
const {persistor, store} = configureStore();

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    Category: CategoryScreen,
    SopDetail: {
      screen: SopDetailScreen,
      path: 'eoc://SopDetail/:sopId',
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
  createDrawerNavigator({
    Root: {
      screen: StackNavigator,
      path: 'eoc://',
    },
  }),
);

export const createNavigation = () => {
  return (
    <Provider store={store}>
      <ReduxNetworkProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ActionSheetProvider>
            <Navigate />
          </ActionSheetProvider>
        </PersistGate>
      </ReduxNetworkProvider>
    </Provider>
  );
};
