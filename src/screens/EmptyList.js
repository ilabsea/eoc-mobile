import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import {H1, Icon} from 'native-base'

const EmptyList = ({ isFetching, data, appVersion }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row' }}>
      {
        isFetching ? 
        <ActivityIndicator 
          style={{opacity: isFetching ? 1.0 : 0.0}} 
          size="large" color="#0000ff" animating={true} /> 
        : 
        data.length ==0 ?
          <React.Fragment>
            <Icon name="ios-heart-empty" style={{ marginRight: 15, marginTop: 2 }} />
            <H1>Empty list v.{appVersion}</H1>
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
    left: 0,
    right: 0,
    top:0,
    bottom: 0,
    alignItems: 'center', 
  }
})

export default EmptyList