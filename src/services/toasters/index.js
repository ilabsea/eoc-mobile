import Toast from 'react-native-root-toast'

let options = {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
}

export const show = (msg) => {
  let toast = Toast.show(msg, options)
  return toast
}