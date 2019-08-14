import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Search from 'react-native-vector-icons/FontAwesome5';
import FlatListStoreItem_Grid from './FlatListStoreItem_Grid';
import StoreModal from './ModalStore';

export default class FruitStore extends Component {
    static navigationOptions = () => {
        return {
            header: null
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            data: ''
        }
    }

    handleChange = key => value => {
        this.setState({
            [key]: value
        })
    }

    componentDidMount() {
        fetch("http://projectsa.gear.host/api/getAllFruitStore", { method: "GET", body: null })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    data: responseData
                })
            })
            .done()
    }

    _onPressStoreModal = () => {
        console.log('show modal')
        this.refs.storeModal.showStoreModal();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewSearch}>
                    <TextInput
                        placeholder='Search'
                        style={styles.input}
                        value={this.state.search}
                        onChangeText={this.handleChange('search')}
                    />
                    <TouchableOpacity>
                        <Search name="search" size={40} style={styles.searchBtn} />
                    </TouchableOpacity>
                </View>

                <View style={styles.viewFilter}>
                    <TouchableOpacity>
                        <Text style={styles.filterBtn}>Quận 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.filterBtn}>Quận 3</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.filterBtn}>Quận Phú Nhuận</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewStores}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index, navigation = this.props.navigation }) => {
                            return (
                                <FlatListStoreItem_Grid item={item} index={index} parentFlatList={this}
                                    screenProps={{
                                        ...this.state,
                                        _onPressStoreModal: this._onPressStoreModal
                                    }}
                                    navigation={navigation}
                                >

                                </FlatListStoreItem_Grid>
                            );
                        }}
                        keyExtractor={(item) => item.Id}
                        horizontal={false}
                        numColumns={2}
                    // refreshing={this.state.refresh}
                    // onRefresh={()=>this.refresh()}
                    >

                    </FlatList>
                </View>
                <StoreModal screenProps={{ ...this.state }} ref={'storeModal'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'gainsboro'
    },
    viewSearch: {
        flex: 1.5, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    viewFilter: {
        flex: 0.7, backgroundColor: 'white', marginBottom: 10, flexDirection: 'row', justifyContent: 'center'
    },
    viewStores: {
        flex: 7.8, backgroundColor: 'white'
    },
    input: {
        padding: 10, borderWidth: 1, borderColor: 'black', width: '80%', margin: 10, borderRadius: 5
    },
    searchBtn: {
        fontWeight: 'normal', margin: 10, textAlign: 'center', color: 'black', marginLeft: 0
    },
    filterBtn: {
        width: 100, fontSize: 10, fontWeight: 'bold', borderTopWidth: 1, margin: 5, paddingTop: 5, textAlign: 'center'
    }

})