import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modalbox';
var screen = Dimensions.get('window');
export default class DetailModal extends Component {
    showDetailModal = () => {
        this.refs.myModal.open();
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: 30,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 180
                }}
                position='center'
                backdrop={true}
            >
                <View style={styles.container}>
                    <Text style={styles.header}>
                        {this.props.screenProps.nameStoreDetail} {this.props.screenProps.idChiNhanhDetail}
                    </Text>
                    <View style={styles.body}>
                        <Image style={styles.img} source={{ uri: `${this.props.screenProps.imgDetail}` }} />
                        <Text style={styles.txt}>Trái cây: </Text>
                        <Text style={styles.txtFr}>...</Text>
                    </View>


                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'flex-start', justifyContent: 'center'
    },
    header: {
        alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'tan', textAlign: 'center', margin: 5, borderBottomWidth: 1, borderBottomColor: 'slateblue'
    },
    body: {
        flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'
    },
    img: {
        width: 100, height: 100, margin: 10, borderRadius: 50, paddingRight: 80, alignSelf: 'flex-start'
    },
    txt: {
        fontWeight: 'bold', fontSize: 15, color: 'slateblue', margin: 10, marginRight: 0
    },
    txtFr: {
        fontWeight: 'bold', fontSize: 15, color: 'black', marginTop: 10, marginLeft: 0, width: 100
    }

})