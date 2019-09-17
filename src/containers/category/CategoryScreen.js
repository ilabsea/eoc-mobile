import React from 'react';
import {Container, Content, List, ListItem, Text} from 'native-base';

const data = [
  {
    id: 1,
    name: 'Decease Outbreak',
    description:
      'a brief description of H5N1 \n a brief description of H5N1 \n a brief description of H5N1 \n a brief description of H5N1 \n ',
  },
  {
    id: 2,
    name: 'Human',
    description:
      'a brief description of Influenza \n a brief description of Influenza \n a brief description of Influenza \n a brief description of Influenza \n ',
  },
  {
    id: 3,
    name: 'Animal',
    description: 'BUNDLE  [Anz, dev] ./index.j',
  },
  {
    id: 4,
    name: 'Environment',
    description: 'BUNDLE  [Anz, dev] ./index.j',
  },
  {
    id: 5,
    name: 'Cross Border',
    description: 'BUNDLE  [Anz, dev] ./index.j',
  },
];

const CategoryScreen = props => {
  const handleListPress = item => {
    props.navigation.navigate({
      routeName: 'SopDetail',
      params: {
        sopGuide: item,
      },
    });
  };

  return (
    <Container>
      <Content>
        <List
          dataArray={data}
          keyExtractor={item => item.id.toString()}
          renderRow={item => {
            return (
              <ListItem onPress={handleListPress.bind(this, item)}>
                <Text>{item.name}</Text>
              </ListItem>
            );
          }}
        />
      </Content>
    </Container>
  );
};

export default CategoryScreen;
