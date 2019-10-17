import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const dbName = 'db_eoc_mobile'
export const schema = appSchema({
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
