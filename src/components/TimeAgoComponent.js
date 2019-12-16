import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from 'native-base';
import moment from 'moment';

const TimeAgoComponent = ({time}) => {
  return (
    <View style={styles.wrapper}>
      <Icon name="md-time" style={styles.icon} />
      <Text style={styles.time}>{moment(time).fromNow()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
    color: '#666666',
  },
  time: {color: '#666666', fontSize: 14},
});

export default TimeAgoComponent;
