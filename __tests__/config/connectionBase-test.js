import * as conn from '../../src/config/connectionBase';

it('test connectionbase', () => {
  const expected = [
    'uri',
    'host',
    'port',
    'sops_path',
    'tokens_path',
    'category_path',
  ];
  expect(Object.keys(conn)).toEqual(expect.arrayContaining(expected));
});

it('render category_path(:id)', () => {
  expect(conn.category_path(1)).toEqual('api/v1/categories/1');
});
