import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import User from '../../User';
import firebase from 'firebase';
import Send from 'react-native-vector-icons/Ionicons';

export default class AdminChatScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'Chat'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
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
            result = d.getFullYear() + ' ' + result;
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
                backgroundColor: item.from === User.phone ? 'blue' : 'yellow', borderRadius: 5, marginBottom: 10
            }}>
                <Text style={{ color: 'black', padding: 7, fontSize: 16, alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start', }}>
                    {item.message}
                </Text>
                <Text style={{ color: 'tan', padding: 3, fontSize: 12, alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start', }}>
                    {this.converTime(item.time)}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ height: 300, padding: 10 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <TextInput
                        style={{ padding: 10, borderWidth: 1, borderColor: 'black', width: '80%', height: 50, margin: 10, borderRadius: 5 }}
                        value={this.state.textMessage}
                        placeholder="Type..."
                        onChangeText={this.handleChange('textMessage')}
                    />

                    <TouchableOpacity onPress={() => this.sendMessage()}>
                        <Send style={{ padding: 5, margin: 5, textAlign: 'center', justifyContent: 'center', color: 'slateblue' }} name="md-send" size={50} />
                    </TouchableOpacity>


                </View>
            </View>
        );
    }
}