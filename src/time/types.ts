import * as t from 'io-ts'
import { Datetime, Time } from './js-joda.io'

type TimeRange = { start: Time, end: Time }
const TimeRange = t.type({ start: Time, end: Time })

export { Datetime, Time, TimeRange }