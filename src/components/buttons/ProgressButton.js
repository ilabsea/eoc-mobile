import React from 'react';
import {StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

const ProgressButton = ({progress}) => (
  <Progress.Circle
    endAngle={1}
    size={40}
    style={styles.progressCircle}
    progress={progress}
    indeterminate={false}
    showsText={true}
  />
);

const styles = StyleSheet.create({
  progressCircle: {
    margin: 10,
  },
});

export default ProgressButton;
