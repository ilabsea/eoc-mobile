import React from 'react'
import { Container, Content, Text, Button, List, ListItem, Header, Left, Icon, Body, Title, Right } from 'native-base'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
import { service } from '../services'

class ModalScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contents: []
    }
  }

  componentDidMount() {
    this.openDir()
  }

  openDir = () => {
    RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}/Download`) 
    .then((result) => {
      console.log('GOT RESULT', result);

      this.setState({
        contents: result
      })

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

  handleView(path) {
    FileViewer.open(path)
      .then(() => {
        // success
        console.log('success')
      })
      .catch(error => {
        // error
        console.log(error.message)
        service.toastManager.show(error.message)
      });
  }

  render() {
    return <Container>
      <Header>
        <Left>
          <Button onPress={ () => this.props.navigation.goBack() }>
            <Icon name="md-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Back</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <List>
          {
            this.state.contents.map(c => {
              return <ListItem key={c.name} onPress={() => this.handleView(c.path)}>
              <Text>{c.name}</Text>
            </ListItem>
            })
          }
        </List>
      </Content>
    </Container>
  }
}

export default ModalScreen