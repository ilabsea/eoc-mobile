import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {dbName, schema} from './schema';
import {modelClasses} from './index';

const adapter = new SQLiteAdapter({
  dbName,
  schema,
});

export default new Database({
  adapter,
  modelClasses,
  actionsEnabled: true,
});
