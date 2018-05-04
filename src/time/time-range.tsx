import React from 'react';
import { View, Text } from 'react-native';
import { TimeRange as Type } from './types'

type TimeRange = Type

function TimeRange({ start, end }: TimeRange) {
  return (
    <View>
      <Text>{start.toString()} - {end.toString()}</Text>
    </View>
  )
}

export { Type }

export default TimeRange