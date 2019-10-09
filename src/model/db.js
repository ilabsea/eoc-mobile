import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema'

import Download from './Download'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    Download
  ],
  actionsEnabled: true,
})

export default database