import React from 'react'
import * as Progress from 'react-native-progress'

const ProgressButton = ({ progress }) => (
  <Progress.Circle
    endAngle={1}
    size={40}
    style={{ margin: 10 }}
    progress={progress}
    indeterminate={false}
    showsText={true} />
)

export default ProgressButton