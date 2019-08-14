import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';
var screen = Dimensions.get('window');
export default class StoreModal extends Component {
    showStoreModal = () => {
        this.refs.myStoreModal.open();
    }
    render() {
        return (
            <Modal
                ref={"myStoreModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: 30,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: screen.height - 50
                }}
                position='center'
                backdrop={true}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.header}>
                            OPTION
                        </Text>

                        <TextInput
                            placeholder='ID cửa hàng'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Tên cửa hàng'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Loại cửa hàng'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Tên chủ cửa hàng'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Số điện thoại cửa hàng'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Địa chỉ cửa hàng'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Phường'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Quận'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Thành phố'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />

                        <TextInput
                            placeholder='Hình ảnh cửa hàng'
                            style={styles.input}
                        // value={this.state.search}
                        // onChangeText={this.handleChange('search')}
                        />
                        <View style={styles.btnView}>
                            <TouchableOpacity>
                                <Text style={styles.btn}>UPDATE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.btn}>ADD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.btn}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    header: {
        fontSize: 20, fontWeight: 'bold', color: 'tan', textAlign: 'center', margin: 5, borderBottomWidth: 1, borderBottomColor: 'slateblue'
    },
    input: {
        padding: 10, borderWidth: 1, borderColor: 'black', width: '80%', margin: 5, borderRadius: 5
    },
    btnView: {
        flex: 1, flexDirection: 'row'
    },
    btn: {
        borderWidth: 1, borderColor: 'black', margin: 5, borderRadius: 5, padding: 10, borderColor: 'slateblue', color: 'tan'
    }
})