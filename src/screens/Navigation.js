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
import CategoryScreen from './CategoryScreen'
import SopDetailScreen from './SopDetailScreen'
import PopupModalScreen from './PopupModalScreen'
import Notification from './NotificationScreen'

const StackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: { title: "Guidelines" }
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: { title: "Category" }
  },
  SopDetail: {
    screen: SopDetailScreen,
    navigationOptions: { title: "Sop detail" }
  },
  PopupModal: {
    screen: PopupModalScreen,
    navigationOptions: { title: "Filter" }
  }
}, {
  initialRouteName: 'Home',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    title: "Guidelines"
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
