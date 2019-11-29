import React from 'react'
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native'
import { H1 } from 'native-base'
import { appVersion } from '../config/utils'

const EmptyList = ({ isFetching, data }) => (
  isFetching ? 
  <View style={styles.container}>
    <View testID="loading" style={{ flexDirection: 'row' }}>
      <ActivityIndicator 
        style={{opacity: isFetching ? 1.0 : 0.0}} 
        size="large" color="#0000ff" animating={true} /> 
    </View>
  </View>
  : 
  data.length == 0 ?
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <H1 testID="emptyMsg">No related items</H1>
    <Text>App version: { appVersion }</Text>
  </View>
  : null
)

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    position: 'absolute',
    alignItems: 'center', 
    left: 0,
    right: 0,
    top:0,
    bottom: 0,
    zIndex: 1
  }
})

export default EmptyList