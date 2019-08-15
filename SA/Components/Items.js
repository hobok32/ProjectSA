import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            color: "darkslateblue",
            colorN: "tan",
            isColor: false,
        }
    }
    colorChange = () => {
        this.setState({ isColor: true })
    }
    resetColor = () => {
        this.setState({ isColor: false })
    }
    render() {
        return (
            <View style={styles.containerItem}>
                <Text style={{
                    fontSize: 15, fontWeight: "bold", textAlign: "center", margin: 5, color: (this.state.isColor == false) ? this.state.color : this.state.colorN,
                    width: this.props.width * 0.2, backgroundColor: "gainsboro"
                }}>
                    {this.props.item.Id}
                </Text>
                <Text style={{
                    fontSize: 15, fontWeight: "bold", textAlign: "center", margin: 5, color: this.state.color, color: (this.state.isColor == false) ? this.state.color : this.state.colorN,
                    width: this.props.width * 0.4, backgroundColor: "gainsboro"
                }}>
                    {this.props.item.TenChuChiNhanh}
                </Text>
                <Text style={{
                    fontSize: 15, fontWeight: "bold", textAlign: "center", margin: 5, color: this.state.color, color: (this.state.isColor == false) ? this.state.color : this.state.colorN,
                    width: this.props.width * 0.3, backgroundColor: "gainsboro"
                }}>
                    {this.props.item.SoDienThoaiChiNhanh}
                </Text>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0, right: 0
                    }}
                    onPress={() => this.props.screenProps.handleChangeItem(
                        'id', `${this.props.item.Id}`,
                        'idType', `${this.props.item.IdLoai}`,
                        'phoneNum', `${this.props.item.SoDienThoaiChiNhanh}`,
                        'address', `${this.props.item.DiaChiChiNhanh}`,
                        'phuong', `${this.props.item.Phuong}`,
                        'quan', `${this.props.item.Quan}`,
                        'city', `${this.props.item.ThanhPho}`,
                        'idStore', `${this.props.item.IdCuaHang}`,
                        'image', `${this.props.item.Image}`,
                        'nameOwner', `${this.props.item.TenChuChiNhanh}`
                    )}
                    onPressIn={this.colorChange}
                    onPressOut={this.resetColor}
                    onLongPress={() => this.props.screenProps._onPressDetailModal(
                        this.props.nameStore,
                        this.props.item.Image,
                        this.props.item.Id
                    )}
                >
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerItem: {
        flex: 1, backgroundColor: 'gainsboro', flexDirection: 'row'
    },
})
