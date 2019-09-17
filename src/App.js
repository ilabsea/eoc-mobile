import React from 'react';
import {} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createStore from './stores';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist';

import RootScreen from './containers/root/RootScreen';
import GuideLineListScreen from './containers/guideline-list/GuideLineListScreen';

const {store, persistor} = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
