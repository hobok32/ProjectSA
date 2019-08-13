import React, {Component} from'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

class FlatListItem extends Component{
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'gainsboro', flexDirection: 'row'}}>
                <Text style={{
                    fontSize: 15, fontWeight: "bold", textAlign: "center", margin: 5,
                    width: this.props.width * 0.2, backgroundColor: "gainsboro"
                }}>
                    {this.props.item.Id}
                </Text>
                <Text style={{
                    fontSize: 15, fontWeight: "bold", textAlign: "center", margin: 5, 
                    width: this.props.width * 0.4, backgroundColor: "gainsboro"
                }}>
                    {this.props.item.Name}
                </Text>
                <Text style={{
                    fontSize: 15, fontWeight: "bold", textAlign: "center", margin: 5, 
                    width: this.props.width * 0.3, backgroundColor: "gainsboro"
                }}>
                    {this.props.item.Price}
                </Text>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0, right: 0
                    }}
                >
                </TouchableOpacity>
            </View>
        );
}}

export default class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: "",
        }
    }

    componentDidMount() {
        fetch("http://soapservice.gear.host/api/Fruit", { method: "GET", body: null })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    data: responseData
                })
            })
            .done()
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({ item, index }) => {
                            return (
                                <FlatListItem
                                    width={width}
                                    height={height} item={item} index={index} parentFlatList={this}
                                   />
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
            </View>
        );
    }
}