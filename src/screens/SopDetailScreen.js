import React from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { Container, Content, Text, Header, 
      Left, Right, Body, Title, Button, Icon, H1 } from 'native-base'

class SopDetailScreen extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      progress: 0,
      indeterminate: true,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  download() {
    this.setState({
      visible: false
    })
  }

  render() {
    // let item = this.props.navigation.getParam('item')

    

    return <Container>
      <Header>
        <Left>
          <Button transparent 
                  onPress={ () => this.props.navigation.goBack() }>
            <Icon name="md-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{'item.name'}</Title>
        </Body>
        <Right />
      </Header>

      <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <H1 style={{ marginBottom: 15 }}>{'item.name'}</H1>

        {
          this.state.visible ?
          <Button rounded info onPress={() => this.download()}>
            <Icon name="download" />
          </Button>
          :
          <Progress.Circle
            endAngle={1}
            size={50}
            style={styles.progress}
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
            showsText={true}
            style={{ }}
          />
        }
        </View>
      </Content>
    </Container>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },
});


export default SopDetailScreen