import React from 'react';
import { View, ViewProps, Text } from 'react-native';
import { LocalTime } from 'js-joda'
import styled from 'styled-components/native'

import Time from '../time/time'

namespace TimeInterval {
  export type Props = ViewProps & {
    value?: {
      start: LocalTime
      end: LocalTime
    }
  }
}

const Container = styled.View`
  align-items: center;
  flex-direction: column;
`

function TimeInterval({
  value: { start = LocalTime.now(), end  = LocalTime.now() } = {}, ...props
}: TimeInterval.Props) {
  return (
    <Container {...props}>
      <Time color="primary" size="huge" value={start} style={{ marginBottom: 0 }} />
      <Time color="secondary" size="small" value={end} format="  - h:mm"/>
    </Container>
  )
}

export default TimeInterval