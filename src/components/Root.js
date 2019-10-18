import React from 'react'
import { Container, Content } from 'native-base'
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
    return (
      <Container>
        <Content>
          { this.props.children }
        </Content>
      </Container>
    )
  }
}

export default Root