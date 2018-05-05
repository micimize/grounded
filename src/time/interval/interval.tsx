import React from 'react';
import { View, Text } from 'react-native';
import { LocalTime } from 'js-joda'

type TimeInterval = {
  start: LocalTime
  end: LocalTime
}

function TimeInterval({ start, end }: TimeInterval) {
  return (
    <View>
      <Text>{start.toString()} - {end.toString()}</Text>
    </View>
  )
}

export default TimeInterval