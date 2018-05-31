import React from 'react';
import { View, ViewProps, Text } from 'react-native';
import { LocalTime } from 'js-joda'
import styled, { css } from 'styled-components/native'

import Time from '../time/time'
import TimeInput from '../time/time-input.web'

type Interval = {
  start?: LocalTime
  end?: LocalTime
}
namespace TimeInterval {
  export type Props = ViewProps & {
    value?: Interval
    onEdit?: (value?: Interval) => any
  }
}


const EditableTimeInterval = themed<EditableTime.Props>(createEditable({
  display: Time,
  editor: Input,
  controller: EditBox,
}) as any)

function Interval({
  value: { start = LocalTime.now(), end  = LocalTime.now() } = {},
  onEdit,
  ...props
}: TimeInterval.Props) {
  let editStart = onEdit ? (start?: LocalTime) => onEdit && onEdit({ start, end }) : undefined
  let editEnd = onEdit ? (end?: LocalTime) => onEdit && onEdit({ start, end }) : undefined
  return (
    <View {...props}>
      <Time color="primary" size="huge" value={start} style={{ marginBottom: 0 }}
        onEdit={editStart} />
      <Time color="secondary" size="small" value={end} format="  - h:mm"
        onEdit={editStart} />
    </View>
  )
}

const TimeInterval = styled(Interval)`
  align-items: center;
  flex-direction: column;
`


export default TimeInterval