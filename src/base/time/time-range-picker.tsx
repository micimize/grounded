import React from 'react';
import { Col, Form, DatePicker, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import { Time, TimeRange } from './types'
import TimePicker from './time-picker'

type Range = { start: Time, end: Time }
type NullableRange = { start?: Time | null, end?: Time | null }

type Props = Omit<TimePicker.PassThroughProps, 'format'> & {
  defaultOpenValue?: Range,
  format?: {
    start: string,
    end: string,
  }
  min?: Time,
  max?: Time,
} & ({
  value?: NullableRange,
  endRequired: true,
  onChange?: (value: Range) => any,
} | {
  value?: Partial<Range>,
  endRequired?: false,
  onChange?: (value: { start: Time, end?: Time }) => any
})

function TimeDivider({ }: {}) {
  return (
    <span style={{
      display: 'inline-block',
      height: 40,
      textAlign: 'center',
      verticalAlign: 'top',
      lineHeight: 2.75,
      marginLeft: 5,
      marginRight: 5,
    }}>-</span>
  )
}

let selectValue = ({ value }: Props) => {
  if (!value) {
    return value
  }
  return {
    start: value.start || undefined,
    end: value.end || undefined
  }
}

// unused
let validationMessages = {
  toLow: 'select a value after the previous event end time',
  toHigh: 'select a value before the next event end time',
  startsAfterEnd: 'start time should be less than end time'
}

class TimeRangePicker extends React.Component<Props, { value: Partial<Range> }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: selectValue(props) || {}
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const value = selectValue(nextProps)
    if (value) {
      this.setState({ value })
    }
  }

  isBounded = (value: Time) => {
    const { min, max } = this.props
    return !(
      // too low
      (min && (min.valueOf() > value.valueOf())) ||
      // too high
      (max && max.valueOf() < value.valueOf())
    )
  }

  processChange = (value: Partial<Range>) => this.setState({ value }, () => {
    // always need a start time, but not necessarily an end time
    if (
      value.start &&
      (value.end || !this.props.endRequired) &&
      this.props.onChange
    ) {
      // for some reason the discrimiated union messes with this
      (this.props.onChange as any)(value)
    }
  })

  // TODO str second arg, error popup or something
  processStart = (start: Time) => {
    if (this.isBounded(start)) {
      let end = this.state.value.end
      // start pushes out end
      end = end && end.isAfter(start) ? end : undefined 
      this.processChange({ start, end })
    }
  }

  processEnd = (end: Time | undefined) => {
    let start = this.state.value.start
    // start blocks end
    if (!end || (this.isBounded(end) && ((!start) || end.isAfter(start)))) {
      this.processChange({ start, end })
    }
  }

  render() {
    let {
      min,
      max,
      endRequired = false,
      defaultOpenValue: def = {} as Partial<Range>,
      format = { start: 'HH:mm', end: 'HH:mm' }
    } = this.props
    let { start, end } = this.state.value
    return (
      <div>
        <TimePicker
          hideDisabledOptions
          allowEmpty={false}
          format={format.start}
          placeholder="start time"
          onChange={this.processStart}
          value={start}
          defaultOpenValue={def.start || start || min} />
        <TimeDivider />
        <TimePicker
          hideDisabledOptions
          allowEmpty={!endRequired}
          format={format.end}
          placeholder="end time"
          onChange={this.processEnd}
          value={end} 
          defaultOpenValue={def.end || end || start || def.start || min} />
      </div>
    )
  }
}

export default TimeRangePicker

/*
  validateBounds = (value: Time, callback) => {
    const { minStart, maxEnd } = this.props
    if (value && (minStart.valueOf() > value.valueOf())) {
      callback('select a value after the previous event end time')
    } else if (value && (maxEnd.valueOf() < value.valueOf())) {
      callback('select a value before the next event end time')
    } else {
      callback()
    }
  }

  validateStart = (rule, start, callback) => {
    let { validateFields, getFieldValue } = this.props.form
    if (getFieldValue('end')) {
      validateFields(['end'], { force: true }, () => {/* * / })
    }
    this.validateBounds(start, callback)
  };

  validateEnd = (rule, end, callback) => {
    const { form, minStart } = this.props
    const start = form.getFieldValue('start') || minStart
    if (end && end.valueOf() < start.valueOf()) {
      callback('start time should be less than end time');
    } else {
      this.validateBounds(end, callback)
    }
  };
*/
