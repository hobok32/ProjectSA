import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
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
            name: "",
            price: "",
            season: "",
            storeamount: "",
            refresh: false,
            idDetail: "",//Id chi tiết,
            nameDetail: "",
            priceDetail: "",
            seasonDetail: "",
            storeAmountDetail: ""
        }
    }
    componentDidMount() {
        fetch(`http://projectsa.gear.host/api/getFruitAndChiNhanhByIdCH/${this.props.navigation.getParam('IdCH')}`, { method: "GET", body: null })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    data: responseData.ChiNhanh
                })
                console.log(this.state.data)
            })
            .done()

    }
    handleChangeSearch = (text) => {
        this.setState({
            search: text
        })
    }
    handleChangeId = (text) => {
        this.setState({
            id: text
        })
    }
    handleChangeName = (text) => {
        this.setState({
            name: text
        })
    }
    handleChangePrice = (text) => {
        this.setState({
            price: text
        })
    }
    handleChangeSeason = (text) => {
        this.setState({
            season: text
        })
    }
    handleChangeStoreAmount = (text) => {
        this.setState({
            storeamount: text
        })
    }
    Search = async (search) => {
        if (search == "") {
            await fetch("http://soapservice.gear.host/api/Fruit", { method: "GET", body: null })
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
            fetch(`http://soapservice.gear.host/api/Fruit/search/${search}`, { method: "GET", body: null })
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
    Update = async (id, name, price, season, storeAmount) => {
        await fetch("http://soapservice.gear.host/api/Fruit",
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        Id: id,
                        Name: name,
                        Price: price,
                        Season: season,
                        StoreAmount: storeAmount
                    })
            })
            .done()

        this.refresh();
    }
    Add = async (name, price, season, storeAmount) => {
        await fetch("http://soapservice.gear.host/api/Fruit",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        Name: name,
                        Price: price,
                        Season: season,
                        StoreAmount: storeAmount
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
                        await fetch("http://soapservice.gear.host/api/Fruit",
                            {
                                method: "DELETE",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(
                                    {
                                        Id: id
                                    })

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
        fetch("http://soapservice.gear.host/api/Fruit", { method: "GET", body: null })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    data: responseData,
                    refresh: false
                })
            })
            .done()
    }
    _onPressDetailModal = (id, name, price, season, storeAmount) => {
        this.setState({
            idDetail: id,
            nameDetail: name,
            priceDetail: price,
            seasonDetail: season,
            storeAmountDetail: storeAmount
        })
        this.refs.detailModal.showDetailModal();
    }
    _scrollToEnd = () => {
        this.refs.flatList.scrollToEnd(true);
    }
    _scrollToIndex = (ind) => {
        this.refs.flatList.scrollToIndex({ animated: true, index: ind - 1 });
    }
    render() {
        console.log(this.props.navigation.getParam('IdCH'))
        return (
            <View style={styles.container}>
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
                        <Text style={styles.nameHeader}>Name</Text>
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
                                    width={width}
                                    height={height} item={item} index={index} parentFlatList={this}
                                    screenProps={{
                                        ...this.state,
                                        setDistrist: this.setDistrist,
                                        setCity: this.setCity,
                                        setId: this.setId,
                                        _onPressDetailModal: this._onPressDetailModal,
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
                                onChangeText={this.handleChangeId}
                                value={this.state.id} />

                            <TextInput
                                style={styles.inputText}
                                placeholder="Name"
                                autoCapitalize="words"
                                onChangeText={this.handleChangeName}
                                value={this.state.name} />

                            <TextInput
                                style={styles.inputText}
                                placeholder="Price"
                                autoCapitalize="words"
                                onChangeText={this.handleChangePrice}
                                value={this.state.price} />

                            <TextInput
                                style={styles.inputText}
                                placeholder="Season"
                                autoCapitalize="words"
                                onChangeText={this.handleChangeSeason}
                                value={this.state.season} />

                            <TextInput
                                style={styles.inputText}
                                placeholder="Store Amount"
                                autoCapitalize="words"
                                onChangeText={this.handleChangeStoreAmount}
                                value={this.state.storeamount} />

                        </ScrollView>
                    </View>

                    <View style={styles.inputButtonView}>
                        <TouchableOpacity onPress={async () => {
                            await this.Update(this.state.id, this.state.name, this.state.price, this.state.season, this.state.storeamount)
                            this._scrollToIndex(this.state.id)
                        }}>
                            <Text style={styles.inputButton}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={async () => {
                            await this.Add(this.state.name, this.state.price, this.state.season, this.state.storeamount)
                            this._scrollToEnd()
                        }}>
                            <Text style={styles.inputButton}>Add</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={async () => this.Delete(this.state.id)}>
                            <Text style={styles.inputButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DetailModal screenProps={{ ...this.state }} ref={'detailModal'}></DetailModal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gainsboro", flex: 1
    },
    //Header
    headerText: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 10, borderRadius: 10,
        color: "white", borderBottomWidth: 0, marginBottom: 0, elevation: 5, backgroundColor: "slategray"
    },
    mainView: {
        flex: 5, borderBottomWidth: 0, margin: 5
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
        flex: 5, borderTopWidth: 0, margin: 10, marginTop: 0, flexDirection: "row"
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
        fontSize: 20, fontWeight: "bold", color: "whitesmoke", borderWidth: 0.5, padding: 10, textAlign: "center",
        backgroundColor: "slategray", borderColor: "slategray", elevation: 5, width: 100, borderRadius: 10
    },

    appleLogo: {
        width: 100, height: 100, margin: 5, alignSelf: "center"
    }
})