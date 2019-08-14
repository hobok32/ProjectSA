import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class FlatListStoreItem_Grid extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.Image} source={{ uri: `${this.props.item.Image}` }} />
                <Text style={styles.nameStore}>{this.props.item.TenCuaHang}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FruitStoreDetail', { IdCH: this.props.item.Id }, console.log(this.props.item.Id))}
                    onLongPress={() => { this.props.screenProps._onPressStoreModal() }}
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0, right: 0
                    }}>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, margin: 10, padding: 10, justifyContent: 'center', alignItems: 'center'
    },
    Image: {
        height: 150, width: 150, borderRadius: 10
    },
    nameStore: {
        color: 'slateblue', margin: 2, fontWeight: 'bold'
    }
})