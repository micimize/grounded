import React from 'react';
import styled from 'styled-components/native'
import { LocalTime, DateTimeFormatter } from 'js-joda'
import * as select from '../../theme/color/selectors'
import * as themed from '../../theme/themed'
import withDefaultProps from '../../theme/with-default-props'

type Time = LocalTime

const Text = styled.Text`
  color: ${select.color}
  background: ${select.background}
`

type Props = themed.Props<{ time: Time, format: string }>

const Time = withDefaultProps<Props>(
  themed.defaultProps({ format: 'h:mm' }),
  ({ time, format, ...props }) => (
    <Text {...props}>
      {time.format(DateTimeFormatter.ofPattern(format))}
    </Text>
  )
)

export default Time