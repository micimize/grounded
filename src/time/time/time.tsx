import React from 'react';
import styled from 'styled-components/native'
import { LocalTime } from 'js-joda'
import * as select from '../../theme/selectors'
import withTheme from '../../theme/with-theme'

type Time = LocalTime

/*
  <Text primary|secondary|accent|success...
        backed? />
*/
const Text = styled.Text`
  color: ${select.color}
`

const Time = withTheme<{ time: Time }>(
  ({ time, ...props }) => <Text {...props}>{time.toString()}</Text>
)

export default Time