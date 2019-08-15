import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import FlatListItem from './Items';
import { TextInput } from 'react-native-gesture-handler';
import IconSearch from 'react-native-vector-icons/Feather';
import DetailModal from './DetailModal';
width = Dimensions.get("window").width;
height = Dimensions.get("window").height;

export default class MainScreen extends Component {
    static navigationOptions = () => {
        return {
            header: null
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            search: "",
            id: "",
            idType: "",
            phoneNum: "",
            address: "",
            phuong: "",
            quan: "",
            city: "",
            idStore: "",
            image: "",
            nameOwner: "",
            refresh: false,
            nameStoreDetail: "",
            imgDetail: "",
            idChiNhanhDetail: "",
            fruit: "",
            isLoading: true
        }
    }
    componentDidMount() {
        fetch(`http://projectsa.gear.host/api/getFruitAndChiNhanhByIdCH/${this.props.navigation.getParam('item').Id}`, { method: "GET", body: null })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    data: responseData.ChiNhanh,
                    fruit: responseData.Fruits
                })
                console.log(this.state.data)
                this.setState({ isLoading: false })
                // console.log(this.state.fruit[0].Name)
            })
            .done()

    }
    handleChangeItem = (
        state1, value1,
        state2, value2,
        state3, value3,
        state4, value4,
        state5, value5,
        state6, value6,
        state7, value7,
        state8, value8,
        state9, value9,
        state10, value10
    ) => {
        this.setState({
            [state1]: value1,
            [state2]: value2,
            [state3]: value3,
            [state4]: value4,
            [state5]: value5,
            [state6]: value6,
            [state7]: value7,
            [state8]: value8,
            [state9]: value9,
            [state10]: value10
        })
    }
    handleChangeSearch = (text) => {
        this.setState({
            search: text
        })
    }
    handleChange = key => value => {
        this.setState({
            [key]: value
        })
    }
    Search = async (search) => {
        if (search == "") {
            await fetch(`http://projectsa.gear.host/api/getAllFruitChiNhanh/${this.props.navigation.getParam('item').Id}`, { method: "GET", body: null })
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({
                        data: responseData
                    })
                })
                .done()
            this.refresh()
        } else {
            this.setState({
                refresh: true
            })
            fetch(`http://projectsa.gear.host/api/getAllFruitChiNhanh/${this.props.navigation.getParam('item').Id}/${search}`, { method: "GET", body: null })
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({
                        data: responseData,
                        refresh: false
                    })
                })
                .done()
        }
    }
    Update = async (id, idType, phoneNum, address, phuong, quan, city, idStore, image, nameOwner) => {
        await fetch(`http://projectsa.gear.host/api/updateChiNhanhByIdAndIdCH/${this.props.navigation.getParam('item').Id}`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        Id: id,
                        IdLoai: idType,
                        SoDienThoaiChiNhanh: phoneNum,
                        DiaChiChiNhanh: address,
                        Phuong: phuong,
                        Quan: quan,
                        ThanhPho: city,
                        IdCuaHang: idStore,
                        Image: image,
                        TenChuChiNhanh: nameOwner
                    })
            })
            .done()

        this.refresh();
    }
    Add = async (idType, phoneNum, address, phuong, quan, city, idStore, image, nameOwner) => {
        await fetch("http://projectsa.gear.host/api/addChiNhanh",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        IdLoai: idType,
                        SoDienThoaiChiNhanh: phoneNum,
                        DiaChiChiNhanh: address,
                        Phuong: phuong,
                        Quan: quan,
                        ThanhPho: city,
                        IdCuaHang: idStore,
                        Image: image,
                        TenChuChiNhanh: nameOwner
                    })
            })
            .done()

        this.refresh();
    }
    Delete = (id) => {
        Alert.alert(
            'Warning',
            'Bạn đã chắc chưa?',
            [
                { text: 'NO', onPress: () => { Alert.alert("Hủy lệnh xóa thành công!") }, style: 'cancel' },
                {
                    text: 'YES',
                    onPress: async () => {
                        await fetch(`http://projectsa.gear.host/api/deleteChiNhanh/${id}`,
                            {
                                method: "DELETE",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: null
                            })
                            .done()
                        this.refresh();
                    }
                },
            ],
            { cancelable: false },
        );
    }
    refresh() {
        this.setState({
            refresh: true
        })
        fetch(`http://projectsa.gear.host/api/getFruitAndChiNhanhByIdCH/${this.props.navigation.getParam('item').Id}`, { method: "GET", body: null })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    data: responseData.ChiNhanh,
                    refresh: false
                })
            })
            .done()
    }
    _onPressDetailModal = (nameStore, img, idChiNhanh) => {
        this.setState({
            nameStoreDetail: nameStore,
            imgDetail: img,
            idChiNhanhDetail: idChiNhanh
        })
        this.refs.detailModal.showDetailModal();
    }
    _scrollToEnd = () => {
        this.refs.flatList.scrollToEnd(true);
    }
    _scrollToIndex = (ind) => {
        this.refs.flatList.scrollToIndex({ animated: true, index: ind - 1 });
    }
    fruit = (f) => {
        if (f.length > 0) {
            let a = "";
            for (i = 0; i < f.length; i++) {
                a = a + f[i].Name + ', '
                if (i == f.length - 2)
                    break;
            }
            a = a + f[f.length - 1].Name
            return a;
        }
        else
            return a = "..."

    }
    render() {
        if (!this.state.isLoading) {
            console.log(this.state.fruit)
            return (
                < KeyboardAvoidingView style={styles.container} behavior="height" enabled >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <Text style={styles.headerText}>
                                {this.props.navigation.getParam('item').TenCuaHang}
                            </Text>
                            <ScrollView>
                                <View style={styles.headerView}>
                                    <Text style={styles.detailParam}>Chủ cửa hàng: {this.props.navigation.getParam('item').TenChuCuaHang}</Text>
                                    <Text style={styles.detailParam}>
                                        Địa chỉ: {this.props.navigation.getParam('item').DiaChiCuaHang},
                                    phường {this.props.navigation.getParam('item').Phuong},
                                    quận {this.props.navigation.getParam('item').Quan},
                                    thành phố {this.props.navigation.getParam('item').ThanhPho}
                                    </Text>
                                    <Text style={styles.detailParam}>
                                        Số điện thoại: {this.props.navigation.getParam('item').SoDienThoaiCuaHang}
                                    </Text>
                                    <Text style={styles.detailParam}>
                                        Trái cây: {this.fruit(this.state.fruit)}
                                    </Text>
                                </View>
                            </ScrollView>
                            <Text style={styles.headerText}>
                                Chi nhánh
                    </Text>

                            <View style={styles.searchView}>
                                <TextInput autoCapitalize="words" onChangeText={this.handleChangeSearch}
                                    value={this.state.search} style={styles.search} placeholder="Seacrh" />
                                <TouchableOpacity onPress={() => this.Search(this.state.search)}>
                                    <IconSearch name="search" style={styles.searchButton} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.mainView}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.idHeader}>ID</Text>
                                    <Text style={styles.nameHeader}>Chủ chi nhánh</Text>
                                    <Text style={styles.typeHeader}>Phone</Text>
                                </View>

                                <FlatList
                                    ref={"flatList"}
                                    initialNumToRender={10}
                                    showsVerticalScrollIndicator={false}
                                    refreshing={this.state.refresh}
                                    onRefresh={() => this.refresh()}
                                    data={this.state.data}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <FlatListItem
                                                width={width} nameStore={this.props.navigation.getParam('item').TenCuaHang}
                                                height={height} item={item} index={index} parentFlatList={this}
                                                screenProps={{
                                                    ...this.state,
                                                    _onPressDetailModal: this._onPressDetailModal,
                                                    handleChangeItem: this.handleChangeItem
                                                }}
                                            />
                                        );
                                    }}
                                    keyExtractor={(item) => item.Name}
                                />
                            </View>

                            <View style={styles.detailView}>
                                <Text>--------------------------------------------</Text>
                            </View>

                            <View style={styles.inputView}>
                                <View style={styles.inputTextView}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Id" autoCapitalize="words"
                                            onChangeText={this.handleChange('id')}
                                            value={this.state.id} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Loại"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('idType')}
                                            value={this.state.idType} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Số điện thoại"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('phoneNum')}
                                            value={this.state.phoneNum} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Địa chỉ"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('address')}
                                            value={this.state.address} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Phường"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('phuong')}
                                            value={this.state.phuong} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Quận"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('quan')}
                                            value={this.state.quan} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Thành phố"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('city')}
                                            value={this.state.city} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Id cửa hàng"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('idStore')}
                                            value={this.state.idStore} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Hình ảnh"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('image')}
                                            value={this.state.image} />

                                        <TextInput
                                            style={styles.inputText}
                                            placeholder="Tên chủ chi nhánh"
                                            autoCapitalize="words"
                                            onChangeText={this.handleChange('nameOwner')}
                                            value={this.state.nameOwner} />

                                    </ScrollView>
                                </View>

                                <View style={styles.inputButtonView}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <TouchableOpacity onPress={async () => {
                                            await this.Update(this.state.id, this.state.idType, 1, this.state.phoneNum, this.state.phuong, this.state.quan, this.state.city, this.state.idStore, this.state.image, this.state.nameOwner)
                                            this._scrollToIndex(this.state.id)
                                        }}>
                                            <Text style={styles.inputButton}>Update</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={async () => {
                                            await this.Add(this.state.idType, 1, this.state.phoneNum, this.state.phuong, this.state.quan, this.state.city, this.state.idStore, this.state.image, this.state.nameOwner)
                                            this._scrollToEnd()
                                        }}>
                                            <Text style={styles.inputButton}>Add</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={async () => this.Delete(this.state.id)}>
                                            <Text style={styles.inputButton}>Delete</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            </View>
                            <DetailModal screenProps={{ ...this.state }} ref={'detailModal'}></DetailModal>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView >
            );
        }
        else {
            return (
                <View style={styles.Loading}><Text style={{ color: 'slateblue', fontSize: 40, fontWeight: 'bold' }}>LOADING...</Text></View>
            );
        }
    }
}

const styles = StyleSheet.create({
    Loading: {
        justifyContent: 'center', alignItems: 'center', flex: 1
    },
    container: {
        backgroundColor: "gainsboro", flex: 1
    },
    //Header
    detailParam: {
        fontSize: 15, fontWeight: 'bold', color: 'black', margin: 15, marginTop: 5, marginBottom: 5
    },
    headerText: {
        fontSize: 15, fontWeight: "bold", textAlign: "left", margin: 15, borderRadius: 10,
        color: "slateblue", borderBottomWidth: 0, marginBottom: 0, elevation: 0, backgroundColor: "gainsboro"
    },
    headerView: {
        flex: 3, backgroundColor: 'gainsboro'
    },
    mainView: {
        flex: 4, borderBottomWidth: 0, margin: 0
    },
    idHeader: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 5, width: this.width * 0.2, color: "black"
    },
    nameHeader: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 5, width: this.width * 0.4, color: "black"
    },
    typeHeader: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 5, width: this.width * 0.3, color: "black"
    },
    //Body
    detailView: {
        height: 40, flexDirection: "row", alignItems: "center", justifyContent: "center"
    },
    seasonText: {
        fontSize: 15, fontWeight: "bold", textAlign: "left", marginLeft: 10, width: this.width * 0.45, color: "black"
    },
    storeAmountText: {
        fontSize: 15, fontWeight: "bold", textAlign: "left", marginLeft: 10, width: this.width * 0.55, color: "black"
    },
    searchView: {
        height: 40, flexDirection: "row", alignItems: "center", margin: 5
    },
    search: {
        width: this.width - 70, borderBottomWidth: 1, marginLeft: 10,
    },
    searchButton: {
        fontSize: 30, fontWeight: "bold", textAlign: "center", marginLeft: 10, color: "black"
    },
    //Footer
    inputView: {
        flex: 6, borderTopWidth: 0, margin: 10, marginTop: 0, flexDirection: "row"
    },
    inputTextView: {
        flex: 1, borderRightWidth: 1
    },
    inputText: {
        width: 150, height: 50, borderBottomWidth: 1, borderColor: "slategray", elevation: 0, margin: 5
    },
    inputButtonView: {
        flex: 1, alignItems: "center", justifyContent: "space-around"
    },
    inputButton: {
        fontSize: 30, fontWeight: "bold", color: "whitesmoke", borderWidth: 0.5, padding: 10, textAlign: "center",
        backgroundColor: "slategray", borderColor: "slategray", elevation: 5, width: 150, borderRadius: 10, margin: 5
    },

    appleLogo: {
        width: 100, height: 100, margin: 5, alignSelf: "center"
    }
})