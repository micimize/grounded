import React from 'react';
import styled from 'styled-components/native'
import { View, ViewProps, Text } from 'react-native';

import { Time } from '../time'

type Interval = {
  start?: Time
  end?: Time
}

namespace TimeInterval {
  export type Props = ViewProps & {
    value?: Interval
    onEdit?: (value?: Interval) => any
  }
  export type Component = React.Component<Props & {
    start?: Time.Component
    delimiter?: React.ReactNode
    end?: Time.Component
  }>
}

const Interval = styled.View.attrs(
  start:

)``




function Interval({
  value: { start = LocalTime.now(), end  = LocalTime.now() } = {},
  ...props
}: TimeInterval.Props) {
  return (
    <View {...props}>
      <Time color="primary" size="huge" value={start} style={{ marginBottom: 0 }}/>
      <Time color="secondary" size="small" value={end} format="  - h:mm"/>
    </View>
  )
}

const TimeInterval = styled(Interval)`
  align-items: center;
  flex-direction: column;
`


export default TimeInterval