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

  const expected = ["remoteUrl", "sopName", "fileName", "fileDigest", "localUrl", "mime"]
  const response = utils.fileInfo(source)

  expect( response ).toHaveProperty('remoteUrl')
  expect( response ).toHaveProperty('sopName', 'sop name')
  expect( Object.keys(response) )
    .toEqual( expect.arrayContaining(expected) )
})
