import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema'

import Download from './Download'

const adapter = new SQLiteAdapter({
  schema,
})

const database = new Database({
  adapter,
  modelClasses: [
    Download
  ],
  actionsEnabled: true,
})

export default database