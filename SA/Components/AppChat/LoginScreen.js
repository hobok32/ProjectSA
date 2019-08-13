import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import User from './../../User';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    state = {
        phone: '',
        name: ''
    }

    handleChange = key => value => {
        this.setState({
            [key]: value
        })
    }

    submitForm = async () => {
        if (this.state.phone.length < 10) {
            Alert.alert('Error', 'Phone number must > 10')
        } else if (this.state.name.length < 3) {
            Alert.alert('Error', 'Name must > 3')
        } else {
            await AsyncStorage.setItem('userPhone', this.state.phone).catch(e => console.log(e));
            User.phone = this.state.phone;
            firebase.database().ref('users/' + User.phone).set({ name: this.state.name });
            this.props.navigation.navigate('App');
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Phone number'
                    style={styles.input}
                    value={this.state.phone}
                    onChangeText={this.handleChange('phone')}
                    keyboardType='number-pad'
                />

                <TextInput
                    placeholder='Name'
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={this.handleChange('name')}
                />

                <TouchableOpacity onPress={this.submitForm}>
                    <Text style={styles.enterBtn}>Enter</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    input: {
        padding: 10, borderWidth: 1, borderColor: 'black', width: '90%', marginBottom: 10, borderRadius: 5
    },
    enterBtn: {
        color: 'darkblue', fontSize: 20
    }
})