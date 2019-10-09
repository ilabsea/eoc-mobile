import { appSchema, tableSchema } from '@nozbe/watermelondb'

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'downloads',
      columns: [
        { name: 'remote_url', type: 'string' },
        { name: 'local_url', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'size', type: 'string' },
        { name: 'file_type', type: 'string' }
      ]
    }),
  ]
})

export default schema
