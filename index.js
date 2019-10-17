/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import { dbName, schema } from "./src/models/schema"
import { modelClasses } from "./src/models/index"

import { createNavigation } from "./src/screens/Navigation"

const adapter = new SQLiteAdapter({
  dbName, schema
})

const database = new Database({
  adapter, modelClasses, actionsEnabled: true
})

const Navigation = createNavigation({ database })

AppRegistry.registerComponent(appName, () => Navigation);
