import React from 'react'
import { service } from '../services'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: ''
    }
  }

  async componentDidMount() {
    await service.permissionManager.requestStorage()
  }

  render() {
    return this.props.children
  }
}

export default Root