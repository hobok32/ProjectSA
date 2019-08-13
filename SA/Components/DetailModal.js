import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet } from 'react-native';
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
                        DETAIL
                    </Text>
                    <View style={styles.body}>
                        <View style={styles.bodyDetail}>
                            <Text style={styles.textDetail}>
                                ID
                            </Text>
                            <Text style={styles.textDetail}>
                                Name
                            </Text>
                            <Text style={styles.textDetail}>
                                Price
                            </Text>
                        </View>

                        <View style={styles.bodyDetailState}>
                            <Text style={styles.textDetailState}>
                                {this.props.screenProps.idDetail}
                            </Text>
                            <Text style={styles.textDetailState}>
                                {this.props.screenProps.nameDetail}
                            </Text>
                            <Text style={styles.textDetailState}>
                                {this.props.screenProps.priceDetail}
                            </Text>
                        </View>

                        <View style={styles.bodyDetail2}>
                            <Text style={styles.textDetail2a}>
                                Season
                            </Text>
                            <Text style={styles.textDetail2b}>
                                Store Amount
                            </Text>
                        </View>

                        <View style={styles.bodyDetailState2}>
                            <Text style={styles.textDetailState2a}>
                                {this.props.screenProps.seasonDetail}
                            </Text>
                            <Text style={styles.textDetailState2b}>
                                {this.props.screenProps.storeAmountDetail}
                            </Text>
                        </View>
                    </View>

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
        fontSize: 20, fontWeight: 'bold', color: 'tan', textAlign: 'center', margin: 5, borderBottomWidth: 1, borderBottomColor: 'slateblue'
    },
    body: {
        flex: 1,
    },
    bodyDetail: {
        flex: 0.3, flexDirection: 'row'
    },
    bodyDetailState: {
        flex: 0.2, flexDirection: 'row'
    },
    bodyDetail2: {
        flex: 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'
    },
    bodyDetailState2: {
        flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 10
    },
    textDetail: {
        margin: 5, marginBottom: 0, fontSize: 13, color: 'slateblue', textAlign: 'center', fontWeight: 'bold', width: (screen.width - 80) / 3
    },
    textDetailState: {
        marginLeft: 5, marginRight: 5, fontSize: 11, color: 'slategray', textAlign: 'center', fontWeight: 'bold', width: (screen.width - 80) / 3
    },
    textDetail2a: {
        margin: 0, marginBottom: 0, fontSize: 13, color: 'slateblue', textAlign: 'center', fontWeight: 'bold', width: (screen.width - 80) / 2, borderRightWidth: 1, borderRightColor: 'slateblue'
    },
    textDetail2b: {
        margin: 0, marginBottom: 0, fontSize: 13, color: 'slateblue', textAlign: 'center', fontWeight: 'bold', width: (screen.width - 80) / 2, borderRightWidth: 0
    },
    textDetailState2a: {
        margin: 0, marginBottom: 0, fontSize: 13, color: 'slategray', textAlign: 'center', fontWeight: 'bold', width: (screen.width - 80) / 2, borderRightWidth: 1, borderRightColor: 'slateblue'
    },
    textDetailState2b: {
        margin: 0, marginBottom: 0, fontSize: 12, color: 'slategray', textAlign: 'center', fontWeight: 'bold', width: (screen.width - 80) / 2, borderRightWidth: 0
    },
})