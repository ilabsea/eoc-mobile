import React from 'react'

// Navigation
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import database from '../models/database'

// State
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Screens
import Root from '../components/Root' 
import HomeScreen from './HomeScreen'
import SearchScreen from './SearchScreen'
import CategoryScreen from './CategoryScreen'
import SopDetailScreen from './SopDetailScreen'
import Notification from './NotificationScreen'

const StackNavigator = createStackNavigator({
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
    path: "eoc://detail/:sopId",
    navigationOptions: { title: "Sop detail" }
  },
}, {
  initialRouteName: "Home",
  mode: "modal",
  headerMode: "float",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#3F51B5",
    },
    headerTintColor: 'white'
  }
})

let Navigate = createAppContainer(
      createDrawerNavigator({
        Root: StackNavigator,
        Notification: {
          screen: Notification,
          navigationOptions: { title: "Notifications" }
        }
      }, {
        initialRouteName: "Root",
      })
    )

const initialState = { database }
const reducer = (state = initialState, action) => state
const store = createStore( reducer )

export const createNavigation = () => {
  return <Provider store={store}>
    <Root>
      <Navigate />
    </Root>
  </Provider>
}
