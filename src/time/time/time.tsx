import React from 'react';
import styled from 'styled-components/native'
import { LocalTime, DateTimeFormatter } from 'js-joda'
import * as select from '../../theme/select'
import * as themed from '../../theme/themed'
import withDefaultProps from '../../theme/with-default-props'

type Time = LocalTime

const Text = styled.Text`
  color: ${select.text.color}
  background: ${select.text.background}
  font-size: ${select.text.size}
`

/*
  Eventually characters will be a general solution for "tuple-like" strings.
  Time is a great example, where maybe you want a big primary hour, and a tiny, muted minutes.
  So, it'll look like characters={[['large', 'primary'], { '...': ['tiny', 'muted'] }]}
*/
type Props = themed.Props<{ time: Time, format: string, characters?: Array<string> }>

const Time = withDefaultProps<Props>(
  themed.defaultProps({ format: 'h:mm' }),
  ({ time, format, ...props }) => (
    <Text {...props}>
      {time.format(DateTimeFormatter.ofPattern(format))}
    </Text>
  )
)

export default Time