import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import User from '../../User';
import firebase from 'firebase';
import FlatListChatItem from './FlatListChatItem';
import Users from 'react-native-vector-icons/Entypo';
import Apple from 'react-native-vector-icons/FontAwesome';

export default class AdminHomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chatboard',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('ProfileAdmin')}>
                    <Users name="user" size={30} style={{ fontWeight: 'bold', margin: 10, textAlign: 'center', color: 'black' }} />
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('FruitAdmin')}>
                    <Apple name="apple" size={30} style={{ fontWeight: 'bold', margin: 10, textAlign: 'center', color: 'black' }} />
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

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'slateblue', margin: 10, padding: 10, borderBottomWidth: 1, borderBottomColor: 'darkviolet' }}>List of User</Text>
                <FlatList
                    ref={"flatListChat"}
                    initialNumToRender={10}
                    showsVerticalScrollIndicator={false}
                    data={this.state.users}
                    renderItem={({ item, index, navigation = this.props.navigation }) => {
                        return (
                            <FlatListChatItem
                                item={item} index={index} parentFlatList={this} navigation={navigation}
                            />
                        );
                    }}
                    keyExtractor={(item) => item.phone}
                />
            </View>
        );
    }
}