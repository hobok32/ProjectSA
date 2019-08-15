import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainScreen from './Components/MainScreen';
import LoginScreen from './Components/AppChat/LoginScreen';
import HomeScreen from './Components/AppChat/HomeScreen';
import AuthLoadingScreen from './Components/AppChat/AuthLoadingScreen';
import ChatScreen from './Components/AppChat/ChatScreen';
import ProfileScreen from './Components/AppChat/ProfileScreen';
import AdminHomeScreen from './Components/AppChat/AdminHomeScreen';
import AdminProfileScreen from './Components/AppChat/AdminProfileScreen';
import AdminChatScreen from './Components/AppChat/AdminChatScreen';
import AppFruitAdmin from './Components/Project/AppFruitAdmin';

const AppStack = createStackNavigator({ Chat: ChatScreen, Home: HomeScreen, Profile: ProfileScreen });
const AdminAppStack = createStackNavigator({
  FruitAdmin: AppFruitAdmin, Home: AdminHomeScreen, ProfileAdmin: AdminProfileScreen, AdminChat: AdminChatScreen,
});
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    AppAdmin: AdminAppStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
))