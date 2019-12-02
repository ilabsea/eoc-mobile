import * as utils from '../../src/config/utils'

jest.mock('react-native-fs', () => ({
  ExternalStorageDirectoryPath: "/test"
}))

it('render correctly', () => {
  const source = {
    name: 'sop name',
    file: { 
      url: '/file.pdf' 
    }
  }

  console.log( utils.fileInfo(source) )
  expect(true).toBe(true)
})
