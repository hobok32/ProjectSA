import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';
import Add from 'react-native-vector-icons/Fontisto';

var screen = Dimensions.get('window');
export default class StoreModal extends Component {
    state = {
        nameFruit: ""
    }
    showStoreModal = () => {
        this.refs.myStoreModal.open();
    }
    handleChange = key => value => {
        this.setState({ [key]: value })
    }
    add = async (countFruit, type, idch, fruit) => {
        if (countFruit == 6 && type == 1 || countFruit == 4 && type == 2 || countFruit == 2 && type == 3) {
            Alert.alert('Error', 'Cửa hàng đã đủ số lượng trái cây!')
        } else {
            await fetch("http://projectsa.gear.host/api/addFruitCuaHang",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            IdCH: idch,
                            IdTraiCay:
                                (fruit == 'Apple') ? 1 :
                                    (fruit == 'Mango') ? 2 :
                                        (fruit == 'WaterMelon') ? 3 :
                                            (fruit == 'Durian') ? 4 :
                                                (fruit == 'Orange') ? 5 :
                                                    (fruit == 'Peach') ? 6 :
                                                        (fruit == 'Papaya') ? 7 :
                                                            (fruit == 'Blueberry') ? 8 :
                                                                (fruit == 'Strawberry') ? 9 :
                                                                    (fruit == 'Banana') ? 10 :
                                                                        (fruit == 'Coconut') ? 11 :
                                                                            (fruit == 'Lime') ? 12 :
                                                                                (fruit == 'Kiwi') ? 13 :
                                                                                    (fruit == 'Passion') ? 14 :
                                                                                        (fruit == 'Pear') ? 15 :
                                                                                            (fruit == 'Apricot') ? 16 :
                                                                                                (fruit == 'Cherry') ? 17 : 18
                        })
                })
                .done()

            this.props.navigation.navigate('FruitStore');
            Alert.alert('Thông báo!', 'Thêm thành công hihi')
        }
    }

    render() {
        return (
            <Modal
                ref={"myStoreModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: 30,
                    shadowRadius: 10,
                    width: screen.width - 180,
                    height: 200, marginTop: screen.height / 2 - (screen.width - 180)
                }}
                position='top'
                backdrop={true}
            >
                <View style={styles.container}>
                    <Text style={styles.header}>THÊM TRÁI CÂY</Text>
                    <View style={styles.body}>
                        <TextInput
                            placeholder="Fruit"
                            style={styles.fruitInput}
                            value={this.state.nameFruit}
                            onChangeText={this.handleChange('nameFruit')}
                        />
                        <TouchableOpacity onPress={() => this.add(this.props.countFruit, this.props.type, this.props.idch, this.state.nameFruit)}>
                            <Add name="angle-dobule-right" size={30} style={styles.add} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.noti}>Apple, Mango, Lime, ...</Text>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    header: {
        alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'darkolivegreen', textAlign: 'center', margin: 5, borderBottomWidth: 1, borderBottomColor: 'slateblue'
    },
    body: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
    },
    fruitInput: {
        width: '40%', height: 50, borderWidth: 1, margin: 5, padding: 5, alignSelf: 'center'
    },
    add: {
        margin: 5, color: 'darkolivegreen',
    },
    noti: {
        color: 'slateblue', marginTop: 10
    }
})