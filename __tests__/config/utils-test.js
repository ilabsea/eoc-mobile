import * as utils from '../../src/config/utils';

jest.mock('react-native-fs', () => ({
  ExternalStorageDirectoryPath: '/test',
}));

it('render correctly', () => {
  const source = {
    name: 'sop name',
    file: {
      url: '/file.pdf',
    },
  };

  const expected = [
    'remoteUrl',
    'sopName',
    'fileName',
    'fileDigest',
    'localUrl',
    'mime',
  ];
  const response = utils.fileInfo(source);

  expect(response).toHaveProperty('remoteUrl');
  expect(response).toHaveProperty('sopName', 'sop name');
  expect(Object.keys(response)).toEqual(expect.arrayContaining(expected));
});

describe('#iconMapping', () => {
  it('bases on `Sop` type', () => {
    expect(utils.iconMapping('Sop')).toMatchObject({
      type: 'MaterialIcons',
      typeIcon: 'picture-as-pdf',
      actionIcon: 'file-download',
      action: 'download',
      color: '#b1090c',
    });
  });

  it('bases on `Category` type', () => {
    expect(utils.iconMapping('Category')).toMatchObject({
      type: 'MaterialIcons',
      typeIcon: 'folder',
      actionIcon: 'arrow-forward',
      action: 'navigate',
      color: '#f39c24',
    });
  });
});

it('returns real name', () => {
  expect(utils.realname('digest_string-real-name.pdf')).toEqual(
    'real-name.pdf',
  );
});
