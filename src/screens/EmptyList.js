import React from 'react';
import {StyleSheet, ActivityIndicator, View, Text} from 'react-native';
import {H1} from 'native-base';
import {appVersion} from '../config/utils';

const Loading = ({isFetching}) => {
  const opacity = isFetching ? 1.0 : 0.0;
  return (
    <View style={styles.container}>
      <View testID="loading" style={styles.loadingDirection}>
        <ActivityIndicator
          style={{opacity}}
          size={60}
          color="#0000ff"
          animating={true}
        />
      </View>
    </View>
  );
};

const EmptyList = ({isFetching, data}) => {
  return isFetching ? (
    <Loading isFetching={isFetching} />
  ) : data.length === 0 ? (
    <View style={styles.noItem}>
      <H1 testID="emptyMsg">No related items</H1>
      <Text>App version: {appVersion}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  noItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDirection: {
    flexDirection: 'row',
  },
});

export default EmptyList;
