/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TwitterScrollableHeader from './Components/TwitterScrollableHeader';
import GettingStarted from './Components/LearningReactNavigation/GettingStarted';
import TabNavigation from './Components/LearningReactNavigation/TabNavigation';
import DrawerNavigation from './Components/LearningReactNavigation/DrawerNavigation';
import AuthenticationFlows from './Components/LearningReactNavigation/AuthenticationFlows';
import Test from './Components/LearningReactNavigation/Test';

AppRegistry.registerComponent(appName, () => GettingStarted);
