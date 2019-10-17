import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { H1 } from 'native-base'

import Root from '../components/Root' 
const Notification = () => {
  return <H1>Notification</H1>
}

export const createNavigation = props => 
  createAppContainer(
    createDrawerNavigator({
      Root: {
        screen: ({ navigation }) => {
          const { database } = props;
          return <Root database={database} navigation={navigation} />
        },
        navigationOptions: { title: "Guidelines" }
      },

      Notification: {
        screen: ({ navigation }) => {
          const { database } = props;
          return <Notification database={database} navigation={navigation} />
        },
        navigationOptions: { title: "Notifications" }
      }
    }, {
      initialRouteName: "Root",
      initialRouteParams: props
    })
  )