import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import User from '../../User';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chats',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text>PROFILE</Text>
                </TouchableOpacity>
            )
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

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)}>
                <Text>{item.name}</Text>
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}
                />
            </View>
        );
    }
}