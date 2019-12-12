/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { createNavigation } from "./src/screens/Navigation"

AppRegistry.registerComponent(appName, () => createNavigation);
