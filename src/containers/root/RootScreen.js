import React from 'react';
import {View} from 'native-base';
import styles from './RootScreenStyle';
import AppNavigator from '../../navigators/AppNavigator';
import NavigationService from '../../services/NavigationService';

const RootScreen = props => {
  return (
    <View style={styles.container}>
      <AppNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </View>
  );
};

// const AppNavigator = createStackNavigator(
//   {
//     Root: RootScreen,
//     SopDetail: GuideLineListScreen,
//   },
//   {
//     initialRouteName: 'Root',
//   },
// );

// const App = createAppContainer(AppNavigator);

// HomeScreen.navigationOptions = {
//   headerTitle: 'Recent guideline',
//   headerStyle: {
//     backgroundColor: '#f4511e',
//   },
//   headerTintColor: '#fff',
//   headerRight: <Icon name="md-search" style={styles.icon} />,
// };

export default RootScreen;
