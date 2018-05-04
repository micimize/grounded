import React from 'react';
import { createComponent } from 'react-fela'

import { TimeRange } from './types'
import EditTimeRange from './time-range-picker'

type FStyle = () => React.CSSProperties
const rangeStyle: FStyle = () => ({
  fontSize: '0.65em',
  display: 'inline-block',
  verticalAlign: 'top',
  position: 'relative',
  width: '2.5em',
  textAlign: 'right',
})
const endStyle: FStyle = () => ({
  color: 'rgba(0, 0, 0, 0.65)',
  fontSize: '0.6em',
  lineHeight: '0.6em',
  height: '1em',
  verticalAlign: 'bottom',
  display: 'block',
})

let Range = createComponent(rangeStyle, 'span')
let End = createComponent(endStyle, 'span')

function TimeRangeDisplay({ start, end }: TimeRange | Pick<TimeRange, 'start'> & Partial<TimeRange>) {
  return (
    <Range>
      <span>{start && start.toString()}</span>
      {end && (<End>-{end.toString()}</End>)}
    </Range>
  )
}

export { EditTimeRange }
export default TimeRangeDisplay