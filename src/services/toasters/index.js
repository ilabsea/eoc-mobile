import Toast from 'react-native-root-toast'

let options = {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  onPress: () => console.log('hi')
}

const viewDetail = ({ payload, database, navigation }) => {
  let item = JSON.parse(payload.item)
  navigation.navigate('SopDetail', { item, database })
  // console.log(payload, database, navigation)
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