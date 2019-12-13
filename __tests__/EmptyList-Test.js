import React from 'react';
import renderer from 'react-test-renderer';
import EmptyList from '../src/screens/EmptyList';

const isChildExist = (tree, type) => {
  let child;
  for (var node in tree.children) {
    child = tree.children[node].children[0];
    if (child && (child === type || child.type === type)) {
      return true;
    }
  }
  return false;
};

it('render correctly', () => {
  const tree = renderer
    .create(<EmptyList isFetching={false} data={[]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('shows empty message', () => {
  const tree = renderer
    .create(<EmptyList isFetching={false} data={[]} />)
    .toJSON();
  expect(isChildExist(tree, 'No related items')).toBeTruthy();
});

it('shows loading', () => {
  const tree = renderer
    .create(<EmptyList isFetching={true} data={[]} />)
    .toJSON();
  expect(isChildExist(tree, 'ActivityIndicator')).toBeTruthy();
});
