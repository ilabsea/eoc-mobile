import React from 'react'
import { Container, Content } from 'native-base'
import { service } from '../services'
import firebase from 'react-native-firebase'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: ''
    }
  }

  async componentDidMount() {
    console.log('anlytics', firebase.analytics())
    await service.permissionManager.requestStorage()
    this.logAppOpen()
  }

  async logAppOpen() {
    await firebase.analytics().setCurrentScreen('ROOT_TEST', 'Root')
  }

  render() {
    return this.props.children
  }
}

export default Root