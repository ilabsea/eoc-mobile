import styleUtils from '../../src/config/styles'

it('returns proper styleName', () => {
  expect(styleUtils).toHaveProperty('btnIcon')
  expect(styleUtils).toHaveProperty('searchResult')
})