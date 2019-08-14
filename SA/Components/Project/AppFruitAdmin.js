import { createAppContainer, createStackNavigator } from 'react-navigation';
import FruitStore from './FruitStore';
import MainScreen from '../MainScreen';

const AppFruitAdmin = createAppContainer(createStackNavigator({
    FruitStore: FruitStore,
    FruitStoreDetail: MainScreen
}))

export default AppFruitAdmin;