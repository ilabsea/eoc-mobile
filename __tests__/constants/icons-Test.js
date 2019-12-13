import {icons} from '../../src/constants/icons';

it('returns correctly', () => {
  expect(icons.type).toBe('MaterialIcons');
  expect(icons).toMatchObject({
    type: 'MaterialIcons',
    name: {
      download: 'file-download',
      fileView: 'remove-red-eye',
    },
    styles: {
      fontSize: 30,
    },
  });
});
