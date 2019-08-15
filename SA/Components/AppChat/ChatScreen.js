import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import User from '../../User';
import firebase from 'firebase';
import Send from 'react-native-vector-icons/Ionicons';
import Users from 'react-native-vector-icons/Entypo';

export default class ChatScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chat',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Users name="user" size={30} style={{ fontWeight: 'bold', margin: 10, textAlign: 'center', color: 'black' }} />
                </TouchableOpacity>
            )
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: 'Admin',
                phone: '0359679911',
            },
            textMessage: '',
            messageList: []
        }
    }

    componentWillMount() {
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
    }

    handleChange = key => value => {
        this.setState({
            [key]: value
        })
    }

    converTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() != d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message;
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({
                textMessage: ''
            })
            console.log(this.state.textMessage)
        }
    }

    renderRow = ({ item }) => {
        return (
            <View styles={{
                flexDirection: 'row', width: '60%',
                backgroundColor: 'gainsboro', borderRadius: 5, marginBottom: 10
            }}>
                <Text style={{
                    color: 'black', padding: 7, fontSize: 16, width: 170, borderRadius: 10,
                    alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                    textAlign: item.from === User.phone ? 'right' : 'left',
                    backgroundColor: item.from === User.phone ? 'slateblue' : 'darkolivegreen'
                }}>
                    {item.message}
                </Text>
                <Text style={{ color: 'tan', padding: 3, fontSize: 12, alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                    {this.converTime(item.time)}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    inverted
                    style={{ height: 380, padding: 10 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'whitesmoke' }}>

                    <TextInput
                        style={{ padding: 10, borderWidth: 1, borderColor: 'black', width: '80%', height: 50, margin: 10, borderRadius: 5 }}
                        value={this.state.textMessage}
                        placeholder="Type..."
                        autoCapitalize="words"
                        onChangeText={this.handleChange('textMessage')}
                    />

                    <TouchableOpacity onPress={() => this.sendMessage()}>
                        <Send style={{ padding: 5, margin: 5, textAlign: 'center', justifyContent: 'center', color: 'slateblue', fontWeight: 'bold' }} name="md-send" size={50} />
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}