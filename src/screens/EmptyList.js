import React from 'react'
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native'
import { H1 } from 'native-base'
import { appVersion } from '../config/utils'

const EmptyList = ({ isFetching, data }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row' }}>
      {
        isFetching ? 
        <ActivityIndicator 
          style={{opacity: isFetching ? 1.0 : 0.0}} 
          size="large" color="#0000ff" animating={true} /> 
        : 
        data.length == 0 ?
          <React.Fragment>
            {/* <Icon name="ios-heart-empty" style={{ marginRight: 15, marginTop: 2 }} /> */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <H1>No related items</H1>
              <Text>App version: { appVersion }</Text>
            </View>
          </React.Fragment>
          : null
      }
    </View>
  </View>
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
  }
})

export default EmptyList