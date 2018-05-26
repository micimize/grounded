import React from 'react';
import { View, ViewProps, Text } from 'react-native';
import { LocalTime } from 'js-joda'
import styled, { css } from 'styled-components/native'

import Time from '../time/time'

namespace TimeInterval {
  export type Props = ViewProps & {
    value?: {
      start: LocalTime
      end: LocalTime
    }
  }
}

function Interval({
  value: { start = LocalTime.now(), end  = LocalTime.now() } = {},
  ...props
}: TimeInterval.Props) {
  return (
    <View {...props}>
      <Time color="primary" size="huge" value={start} style={{ marginBottom: 0 }} />
      <Time color="secondary" size="small" value={end} format="  - h:mm"/>
    </View>
  )
}

const TimeInterval = styled(Interval)`
  align-items: center;
  flex-direction: column;
`


export default TimeInterval