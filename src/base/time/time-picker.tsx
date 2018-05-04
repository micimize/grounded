import React from 'react';
import { TimePicker as ATimePicker } from 'antd'
import { TimePickerProps } from 'antd/lib/time-picker';

import { Time, cast } from './types'

type TimeFields = 'value' | 'defaultOpenValue'

type changeProp = { onChange: (time: Time, timeString: string) => void }

let castChanges = (onChange: TimePicker.Props['onChange']) => onChange ?
  (value, str) => {
    if (value) {
      let time = cast.Time.fromMoment(value)
      onChange(time, time.toString())
    } else {
      onChange(value, str)
    }
  } :
  (time: Time, timeString: string) => null

let castValue = (value: Time | void) => value ? 
  cast.Time.toMoment(value) :
  undefined

/*
manages moment <-> js-joda LocalTime conversions for using antd time picker
*/
class TimePicker extends React.Component<TimePicker.Props, {}> {
  render() {
    let {
      value,
      defaultOpenValue,
      onChange,
      style = { width: '8em', display: 'inline-block' },
      ...props
    } = this.props
    return (
      <ATimePicker style={style} format="HH:mm" placeholder="start time"
        onChange={castChanges(onChange)}
        value={castValue(value)}
        defaultOpenValue={castValue(defaultOpenValue)}
        {...props} />
    )
  }
}

namespace TimePicker {
  export type PassThroughProps = Omit<TimePickerProps, TimeFields | 'onChange'>
  export type Props = PassThroughProps & Partial<Record<TimeFields, Time> & changeProp>
}

export default  TimePicker
