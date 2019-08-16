import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modalbox';
import Add from 'react-native-vector-icons/Fontisto';

var screen = Dimensions.get('window');
export default class DetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: 1,
            fruit: "",
            text: ""
        }
    }

    showDetailModal = () => {
        this.refs.myModal.open();
    }
    handleChange = key => value => {
        this.setState({ [key]: value })
    }
    add = async (countFruit, type, idcn, fruit) => {
        if (countFruit == 6 && type == 1 || countFruit == 4 && type == 2 || countFruit == 2 && type == 3) {
            Alert.alert('Error', 'Cửa hàng đã đủ số lượng trái cây!')
        } else {
            await fetch("http://projectsa.gear.host/api/addFruitChiNhanh",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            IdCN: idcn,
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

    componentDidMount() {
        fetch(`http://projectsa.gear.host/api/GetFruitByIdCN/${this.props.screenProps.idChiNhanhDetail}`, { method: "GET", body: null })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    fruit: responseData
                })
                this.setState({ isLoading: 2 })
            })
            .done()
    }

    fruit = (f) => {
        let a = "";
        if (f.length > 1) {
            for (i = 0; i < f.length; i++) {
                a = a + f[i].Name + ', '
                if (i == f.length - 2)
                    break;
            }
            a = a + f[f.length - 1].Name
            return a;
        }
        else if (f.length == 1)
            return a = f[0].Name;
        else
            return a = "Hông có bán trái nào hếc!"

    }
    fruitNum = (idLoai) => {
        let count = 0;
        if (idLoai == 1)
            count = 6;
        else if (idLoai == 2)
            count = 4;
        else count = 2;
        return count;
    }

    render() {
        if (this.state.isLoading == 1) {
            return (
                <Modal ref={"myModal"}
                    style={{
                        justifyContent: 'center',
                        borderRadius: 30,
                        shadowRadius: 10,
                        width: screen.width - 80,
                        height: 360, marginTop: screen.height / 2 - (screen.width - 180)
                    }}
                    onOpened={() => this.componentDidMount()}
                    position='top'
                    backdrop={true}>
                    <View style={styles.Loading}>
                        <Text style={{ color: 'slateblue', fontSize: 40, fontWeight: 'bold' }}>Loading...</Text>
                    </View>
                </Modal>
            );
        }
        else {
            return (
                <Modal
                    ref={"myModal"}
                    style={{
                        justifyContent: 'center',
                        borderRadius: 30,
                        shadowRadius: 10,
                        width: screen.width - 80,
                        height: 360, marginTop: screen.height / 2 - (screen.width - 180)
                    }}
                    position='top'
                    backdrop={true}
                    onOpened={() => this.componentDidMount()}
                    onClosed={() => this.setState({ isLoading: 1 })}
                >
                    <View style={styles.container}>
                        <Text style={styles.header}>
                            {this.props.screenProps.nameStoreDetail} {this.props.screenProps.idChiNhanhDetail}
                        </Text>
                        <View style={styles.body}>
                            <Image style={styles.img} source={{ uri: `${this.props.screenProps.imgDetail}` }} />
                            <Text style={styles.txt}>Trái cây: </Text>
                            <Text style={styles.txtFr}>{this.fruit(this.state.fruit)}</Text>
                        </View>
                        <Text>
                            Loại: {this.props.screenProps.idLoaiDetail} (Tối đa {this.fruitNum(this.props.screenProps.idLoaiDetail)} trái cây)
                        </Text>
                        <View style={styles.footer}>
                            <Text style={styles.headerAdd}>THÊM TRÁI CÂY</Text>
                            <View style={styles.bodyAdd}>
                                <TextInput
                                    placeholder="Fruit"
                                    style={styles.fruitInput}
                                    value={this.state.text}
                                    onChangeText={this.handleChange('text')}
                                />
                                <TouchableOpacity onPress={() => this.add(
                                    this.state.fruit.length,
                                    this.props.screenProps.idLoaiDetail,
                                    this.props.screenProps.idChiNhanhDetail,
                                    this.state.text)}>
                                    <Add name="angle-dobule-right" size={30} style={styles.add} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.noti}>Apple, Mango, Coconut,...</Text>
                        </View>
                    </View>
                </Modal>
            );
        }

    }
}

const styles = StyleSheet.create({
    Loading: {
        justifyContent: 'center', alignItems: 'center', flex: 1
    },
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    header: {
        alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'darkolivegreen', textAlign: 'center', margin: 5, borderBottomWidth: 1, borderBottomColor: 'slateblue'
    },
    body: {
        flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'
    },
    img: {
        width: 100, height: 100, margin: 10, borderRadius: 50, paddingRight: 80, alignSelf: 'flex-start'
    },
    txt: {
        fontWeight: 'bold', fontSize: 15, color: 'slateblue', margin: 10, marginRight: 0
    },
    txtFr: {
        fontWeight: 'bold', fontSize: 15, color: 'black', marginTop: 10, marginLeft: 0, width: 100
    },
    footer: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    headerAdd: {
        alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'darkolivegreen', textAlign: 'center', margin: 5, borderBottomWidth: 1, borderBottomColor: 'slateblue'
    },
    bodyAdd: {
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