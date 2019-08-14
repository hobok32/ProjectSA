import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import User from '../../User';
import firebase from 'firebase';
import UserIcom from 'react-native-vector-icons/SimpleLineIcons';

export default class ProfileScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'Profile'
        }
    }
    state = {
        users: []
    }
    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            if (person.phone === User.phone) {
                User.name = person.name
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
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