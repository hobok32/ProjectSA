import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import User from './../../User';
import firebase from 'firebase';


export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    componentWillMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyBP8lGfs0lF54ihNBpJ9PRULnm_2CSMVDw",
            authDomain: "chatbox-7119d.firebaseapp.com",
            databaseURL: "https://chatbox-7119d.firebaseio.com",
            projectId: "chatbox-7119d",
            storageBucket: "",
            messagingSenderId: "1086318941230",
            appId: "1:1086318941230:web:eb8b93ee2c987408"
        };
        firebase.initializeApp(firebaseConfig);
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
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