import Toast from 'react-native-root-toast'

const viewDetail = ({ payload, database, navigation, android, path, mime }) => {
  if(payload) {
    let item = JSON.parse(payload.item)
    navigation.navigate('SopDetail', { item, database })
  } else if ( android ) {
    android.actionViewIntent(path, mime)
  }
}

export const show = (msg, data={}) => {
  let toast = Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onPress: () => viewDetail(data)
  })
  return toast
}