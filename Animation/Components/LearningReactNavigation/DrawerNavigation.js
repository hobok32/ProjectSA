import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home</Text>
            </View>
        );
    }
}

HomeScreen.navigationOptions = {
    leftButtonText: "Menu",
    title: "Home"
};

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
}

SettingsScreen.navigationOptions = {
    title: 'Settings'
}

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
})

const DrawerNavigator = createDrawerNavigator({
    AppNavigator
});

const DrawerContainer = createAppContainer(DrawerNavigator);

export default class DrawerNavigation extends React.Component {
    render() {
        return (
            <DrawerContainer />
        );
    }
}