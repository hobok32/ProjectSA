import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import User from './../../User';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    state = {
        phone: '',
        name: '',
        user: '',
        change: 0,
        perPhone: [],
        perName: []
    }

    handleChange = key => value => {
        this.setState({
            [key]: value
        })
    }

    componentDidMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            person = val.val();
            person.phone = val.key;
            this.setState({
                perPhone: this.state.perPhone.concat([person.phone]),
                perName: this.state.perName.concat([person.name])
            })
        })

    }

    isExist = (phone) => {
        for (i = 0; i < this.state.perPhone.length; i++) {
            if (this.state.perPhone[i] == phone) {
                return true;
            }
        }
        return false;
    }

    isNameExist = (name) => {
        for (i = 0; i < this.state.perName.length; i++) {
            if (this.state.perName[i] == name) {
                return true;
            }
        }
        return false;
    }

    nameIndex = (name) => {
        for (i = 0; i < this.state.perName.length; i++) {
            if (this.state.perName[i] == name)
                return i;
        }
        return null;
    }

    phoneIndex = (phone) => {
        for (i = 0; i < this.state.perPhone.length; i++) {
            if (this.state.perPhone[i] == phone)
                return i;
        }
        return null;
    }

    loginForm = async () => {
        if (this.state.phone.length < 10) {
            Alert.alert('Error', 'Phone number must > 10')
        } else if (this.state.name.length < 3) {
            Alert.alert('Error', 'Name must > 3')
        }
        else if (this.isExist(this.state.phone) == true) {
            if (this.nameIndex(this.state.name) == this.phoneIndex(this.state.phone)) {
                if (this.state.phone == '0359679911') {
                    Alert.alert('Welcome Admin!')
                    await AsyncStorage.setItem('userPhone', this.state.phone);
                    User.phone = this.state.phone;
                    this.props.navigation.navigate('AppAdmin')
                }
                else {
                    Alert.alert('Welcome User!')
                    await AsyncStorage.setItem('userPhone', this.state.phone);
                    User.phone = this.state.phone;
                    this.props.navigation.navigate('App')
                }
            }
            else
                Alert.alert('Login fail!')
        } else {
            Alert.alert('ERROR!')
        }
    }

    registForm = async () => {
        if (this.state.phone.length < 10) {
            Alert.alert('Error', 'Phone number must > 10')
        } else if (this.state.name.length < 3) {
            Alert.alert('Error', 'Name must > 3')
        }
        else if (this.isExist(this.state.phone) == true) {
            Alert.alert('Error', 'Phone number already exists!')
        }
        else if (this.isExist(this.state.phone) == false) {
            if (this.isNameExist(this.state.name) == true) {
                Alert.alert('Error', 'Name already exists!')
            } else {
                User.phone = this.state.phone;
                firebase.database().ref('users/' + User.phone).set({ name: this.state.name });
                // this.props.navigation.navigate('App');
                Alert.alert('GO', 'Sussess!')
            }
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

                <View style={styles.btnView}>
                    <TouchableOpacity onPress={this.loginForm}>
                        <Text style={styles.enterBtn}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.registForm}>
                        <Text style={styles.enterBtn}>REGIST</Text>
                    </TouchableOpacity>
                </View>
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
        color: 'darkblue', fontSize: 20, padding: 10, margin: 10, elevation: 5
    },
    btnView: {
        flexDirection: 'row', justifyContent: 'space-around'
    }
})