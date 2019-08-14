import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import User from '../../User';
import UserIcom from 'react-native-vector-icons/SimpleLineIcons';

export default class AdminProfileScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'Profile'
        }
    }

    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <UserIcom name="user" size={200} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'slateblue' }}>
                    {User.phone}
                </Text>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'slateblue' }}>
                    {User.name}
                </Text>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'slateblue', margin: 5, borderWidth: 0.5, padding: 5 }} onPress={() => this.logOut()}>
                    LOG OUT
                </Text>
            </View>
        );
    }
}