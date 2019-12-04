/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { createNavigation } from "./src/screens/Navigation"
import bgMessaging from './src/components/bgMessaging'

AppRegistry.registerComponent(appName, () => createNavigation);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
