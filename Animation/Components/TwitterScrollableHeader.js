import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    Picker,
    TouchableOpacity,
    FlatList
} from 'react-native';
import styles from '../Style/stylesTwitterScrollableHeader';
import Add from 'react-native-vector-icons/Ionicons';
import Delete from 'react-native-vector-icons/EvilIcons';
import Pen from 'react-native-vector-icons/MaterialCommunityIcons';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
const options = ['One', 'Two', 'Three', 'Four', 'Five', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b']
HEADER_MAX_HEIGHT = height / 5;
HEADER_MIN_HEIGHT = HEADER_MAX_HEIGHT / 2;

export default class TwitterScrollableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressAdd: false,
            addName: 'ios-add-circle-outline',
            addNamePress: 'ios-add-circle',
            selectedValue: '',
        }
    }

    pressAddFruit = () => {
        if (this.state.pressAdd == false) {
            this.setState({
                pressAdd: true
            })
        } else { this.setState({ pressAdd: false }) }
    }
    change(d, i) {
        this.setState({ selectedValue: Country[i].name });
    }
    render() {
        const data = ['a', 'b', 'c', 'd', 'e', 'f']
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.imgHeader}
                        source={{ uri: 'https://i.pinimg.com/originals/4d/52/a8/4d52a87fb7056f1210a118b0ccfdcfec.jpg' }} />
                </View>

                <View style={styles.imgView}>
                    <Image style={styles.img}
                        source={{ uri: "https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/60488989_2235024360146646_329398647001186304_n.jpg?_nc_cat=102&_nc_oc=AQk6UtaYCXqN8dcqB6lyZJLSlyy8Zwp_1xydEK7pcNuJocSf0TYzTTtv6SWpqMskelY&_nc_ht=scontent.fsgn8-1.fna&oh=9dcfeba284cf8796323f0d2a91fdeceb&oe=5E112420" }} />
                    <View style={styles.viewAddFruit}>
                        <Picker
                            selectedValue="java"
                            mode={"dialog"}
                            style={styles.pickerFruit}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ language: itemValue })
                            }>
                            <Picker.Item label="Apple" value="java" />
                            <Picker.Item label="Mango" value="java" />
                            <Picker.Item label="Banana" value="java" />
                            <Picker.Item label="WaterMelon" value="java" />
                            <Picker.Item label="Pear" value="java" />
                            <Picker.Item label="Pineapple" value="java" />
                            <Picker.Item label="Orange" value="java" />
                            <Picker.Item label="Durian" value="java" />
                            <Picker.Item label="Strawberry" value="java" />
                            <Picker.Item label="Coconut" value="java" />
                            <Picker.Item label="Lime" value="java" />
                            <Picker.Item label="Papaya" value="java" />
                        </Picker>
                        <TouchableOpacity
                            onPressIn={() => this.pressAddFruit()}
                            onPressOut={() => this.pressAddFruit()}>
                            <View style={styles.viewAddIcon}>
                                <Add
                                    name={
                                        (this.state.pressAdd == true) ?
                                            this.state.addNamePress : this.state.addName
                                    }
                                    size={40}
                                    style={{ color: 'black' }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.viewAddIcon}>
                                <Delete
                                    name='trash' size={45}
                                    style={{ color: 'black' }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.viewAddIcon}>
                                <Pen
                                    name='pencil-outline'
                                    size={35}
                                    style={{ color: 'black' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txt}>
                        Ân Fruit
                    </Text>
                </View>
            </View >
        );
    }
}
