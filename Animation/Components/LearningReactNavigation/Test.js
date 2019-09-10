import React from 'react';
import {
    View,
    Text
} from 'react-native';
import NavigationService from './NavigationService';

export default class Test extends React.Component {
    render() {
        return (
            <View>
                <Text onPress={() => NavigationService.navigate('Other', { userName: 'Lucy' })}>
                    CLICK
                </Text>
            </View>
        );
    }
}