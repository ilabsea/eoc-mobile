import React from 'react'
import AboutUsScreen from '../src/screens/AboutUsScreen'

import renderer from 'react-test-renderer'

it('render correctly', () => {
  const tree = renderer.create(<AboutUsScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})