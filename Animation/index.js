/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TwitterScrollableHeader from './Components/TwitterScrollableHeader';
import AppContainer from './Components/LearningReactNavigation/GettingStarted';

AppRegistry.registerComponent(appName, () => AppContainer);
