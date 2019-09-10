import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Button,
    Text
} from 'react-native';
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    render() {
        return (
            <View>
                <Button title="Show me more of the app" onPress={this._showMoreApp} />
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Other');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

class OtherScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Other</Text>
            </View>
        );
    }
}

class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    render() {
        return (
            <View>
                <Button title="Sign in!" onPress={this._signInAsync} />
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}



const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AuthenticationFlowsContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

export default class AuthenticationFlows extends React.Component {
    render() {
        return (
            <AuthenticationFlowsContainer />
        );
    }
}

