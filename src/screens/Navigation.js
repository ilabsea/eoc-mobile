import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { H1 } from 'native-base'
import Root from '../components/Root' 

const Notification = () => {
  return <H1>Notification</H1>
}

import HomeScreen from './HomeScreen'
import CategoryScreen from './CategoryScreen'
import SopDetailScreen from './SopDetailScreen'
import DownloadDirScreen from './DownloadDirScreen'
import ModalScreen from './ModalScreen'

const stack = (props) => createStackNavigator({
  Home: {
    screen: ({ navigation }) => {
      const { database } = props;
      return <Root>
                <HomeScreen database={database} navigation={navigation}/>
              </Root>
    },
    navigationOptions: { title: "Guidelines" }
  },
  Category: {
    screen: ({ navigation }) => {
      const { database } = props;
      return <Root>
                <CategoryScreen database={database} navigation={navigation}/>
              </Root>
    },
    navigationOptions: { title: "Category" }
  },
  SopDetail: {
    screen: ({ navigation }) => {
      const { database } = props;
      return <Root>
                <SopDetailScreen database={database} navigation={navigation}/>
              </Root>
    },
    navigationOptions: { title: "Sop detail" }
  },
  DownloadDir: {
    screen: ({ navigation }) => {
      const { database } = props;
      return <Root>
                <DownloadDirScreen database={database} navigation={navigation}/>
              </Root>
    },
    navigationOptions: { title: "Download directory" }
  },
  MyModal: {
    screen: ModalScreen,
  }
}, {
  initialRouteName: 'SopDetail',
  initialRouteParams: props,
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    title: "Guidelines"
  }
})

export const createNavigation = props => 
  createAppContainer(
    createDrawerNavigator({
      Root: stack(props),
      Notification: {
        screen: ({ navigation }) => {
          const { database } = props;
          return <Root database={database} navigation={navigation}>
                    <Notification />
                  </Root>
        },
        navigationOptions: { title: "Notifications" }
      }
    }, {
      initialRouteName: "Root",
      initialRouteParams: props
    })
  )