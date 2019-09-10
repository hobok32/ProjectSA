import React from "react";
import { View, Text } from "react-native";
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator
} from "react-navigation";
import TwitterScrollableHeader from "../TwitterScrollableHeader";
import NavigationService from './NavigationService';
import Test from "./Test";

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Text onPress={() => this.props.navigation.navigate('Twitter')}>Go to Twitter Screen</Text>
                <Text onPress={() => this.props.navigation.navigate('Detail')}> Go to Detail Screen</Text>
            </View>
        );
    }
}

class DetailScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Detail Screen</Text>
                <Text onPress={() => this.props.navigation.navigate('Twitter')}>Go to Twitter Screen</Text>
                <Text onPress={() => this.props.navigation.navigate('Home')}> Go to Home Screen</Text>
                <Text onPress={() => this.props.navigation.navigate('Test')}> Go to Test Screen</Text>
            </View>
        );
    }
}

class OtherScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Detail Screen</Text>
                <Text onPress={() => this.props.navigation.navigate('Twitter')}>Go to Twitter Screen</Text>
                <Text onPress={() => this.props.navigation.navigate('Home')}> Go to Home Screen</Text>
                <Text onPress={() => this.props.navigation.navigate('Test')}> Go to Test Screen</Text>
            </View>
        );
    }
}

const DetailStack = createStackNavigator({
    Detail: DetailScreen,
    Test: Test
})

const Stack = createStackNavigator({
    Home: HomeScreen,
    DetailStack: DetailStack
})

const TwitterStack = createStackNavigator({
    Twitter: TwitterScrollableHeader,
    Other: OtherScreen
})

const AppNavigator = createSwitchNavigator({
    Stack: {
        screen: Stack
    },
    TwitterStack: {
        screen: TwitterStack
    },
}, {
        initialRouteName: 'TwitterStack',
    });

const AppContainer = createAppContainer(AppNavigator);

export default class GettingStarted extends React.Component {
    render() {
        return (
            <AppContainer
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
};