import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class FlatListChatItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.item}>{this.props.item.name}</Text>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0, right: 0
                    }}
                    onPress={() => this.props.navigation.navigate('AdminChat', this.props.item)}
                >
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    item: {
        fontSize: 20, color: 'tan', margin: 5, padding: 5, width: 200,
        backgroundColor: 'darkslategrey', textAlign: 'center', borderRadius: 5
    }
})