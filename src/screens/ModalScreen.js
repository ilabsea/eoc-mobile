import React from 'react'
import { Container, Content, Text, Button, List, ListItem } from 'native-base'
import RNFS from 'react-native-fs'

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
        contents: result.map(r => ({ name: r.name }))
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

  render() {
    return <Container>
      <Content padder>
        <List>
          {
            this.state.contents.map(c => {
              return <ListItem key={c.name}>
              <Text>{c.name}</Text>
            </ListItem>
            })
          }
        </List>

        <Button onPress={ () => this.props.navigation.goBack() }>
          <Text>Back</Text>
        </Button>
      </Content>
    </Container>
  }
}

export default ModalScreen