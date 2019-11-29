import React from 'react'
import renderer from 'react-test-renderer'
import EmptyList from '../src/screens/EmptyList'

it('render correctly', () => {
  const tree = renderer.create(<EmptyList isFetching={false} data={[]} />).toJSON()
  expect(tree).toMatchSnapshot()
})