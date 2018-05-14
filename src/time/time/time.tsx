import React from 'react';
import styled from 'styled-components/native'
import { LocalTime, DateTimeFormatter } from 'js-joda'
import * as select from '../../theme/select'
import * as themed from '../../theme/themed'
import withDefaultProps from '../../theme/with-default-props'
import Text from '../../text/editable'

type Time = LocalTime

/*
  Eventually characters will be a general solution for "tuple-like" strings.
  Time is a great example, where maybe you want a big primary hour, and a tiny, muted minutes.
  So, it'll look like characters={[['large', 'primary'], { '...': ['tiny', 'muted'] }]}
*/
type Props = themed.Props<Omit<Text.Props, 'value' | 'onEdit'> & {
  value: Time,
  onEdit?: (time: Time) => any,
  format: string,
  characters?: Array<string>
}>

const wrapEdit = (onEdit: (time: Time) => any) =>
  (text: string) => onEdit(LocalTime.parse(text))

const Time = withDefaultProps<Props>(
  themed.defaultProps({ format: 'h:mm' }),
  ({ value, onEdit, format, ...props }) => (
    <Text {...props} onEdit={onEdit ? wrapEdit(onEdit) : undefined}
      value={value.format(DateTimeFormatter.ofPattern(format))}/>
  )
)

export default Time