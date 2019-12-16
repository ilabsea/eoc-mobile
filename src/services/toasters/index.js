import Toast from 'react-native-root-toast';

const viewDetail = ({payload, navigation, android, path, mime}) => {
  if (payload) {
    let itemId = payload.itemId;
    navigation.navigate('SopDetail', {itemId});
  } else if (android) {
    android.actionViewIntent(path, mime);
  }
};

export const show = (msg, data = {}) => {
  let toast = Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onPress: () => viewDetail(data),
  });
  return toast;
};
