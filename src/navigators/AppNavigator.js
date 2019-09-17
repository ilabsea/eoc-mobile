import {createAppContainer, createStackNavigator} from 'react-navigation';

import CategoryScreen from '../containers/category/CategoryScreen';
import SplashScreen from '../containers/splah-screen/SplashScreen';

const StackNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainScreen: CategoryScreen,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  },
);

export default createAppContainer(StackNavigator);
