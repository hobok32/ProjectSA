import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainScreen from './Components/MainScreen';
import LoginScreen from './Components/AppChat/LoginScreen';
import HomeScreen from './Components/AppChat/HomeScreen';
import AuthLoadingScreen from './Components/AppChat/AuthLoadingScreen';
import ChatScreen from './Components/AppChat/ChatScreen';

const AppStack = createStackNavigator({ Home: HomeScreen, Chat: ChatScreen });
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
))