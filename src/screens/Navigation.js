import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Root from '../components/Root' 

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
    }, {
      initialRouteName: "Root",
      initialRouteParams: props
    })
  )