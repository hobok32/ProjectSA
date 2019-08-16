import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class FlatListStoreItem_Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "slateblue",
            colorN: "tan",
            isColor: false,
        }
    }

    imgColorChange = () => {
        this.setState({ isColor: true })
    }

    imgColorReset = () => {
        this.setState({ isColor: false })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{
                        height: 150, width: 150, borderRadius: 10, borderWidth: 1,
                        borderColor: (this.state.isColor == true) ? this.state.color : this.state.colorN
                    }}
                    source={{ uri: `${this.props.item.Image}` }} />
                <Text style={styles.nameStore}>{this.props.item.TenCuaHang}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FruitStoreDetail', { item: this.props.item }, console.log(this.props.item.Id))}
                    // onLongPress={() => { this.props.screenProps._onPressStoreModal() }}
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0, right: 0
                    }}
                    onPressIn={this.imgColorChange}
                    onPressOut={this.imgColorReset}>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, margin: 10, padding: 10, justifyContent: 'center', alignItems: 'center'
    },
    nameStore: {
        color: 'slateblue', margin: 2, fontWeight: 'bold'
    }
})