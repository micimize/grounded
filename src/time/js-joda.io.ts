import * as t from 'io-ts'
import * as joda from 'js-joda'

function JodaType<T> (name: string, Type: { new (...args: any[]): T, parse (str: string): T }) {
  return new t.Type<T, string>(
    name,
    (mixed): mixed is T => mixed instanceof Type,
    (mixed, context) =>
      t.string.validate(mixed, context).chain(str => {
        try {
          let instance = Type.parse(str)
          return t.success(instance)
        } catch (e) {
          return t.failure(str, context)
        }
      }),
    instance => instance.toString()
  )
}

type Time = joda.LocalTime
const Time = JodaType<joda.LocalTime>('Time', joda.LocalTime)
namespace Time {
  export type O = string
}

type Datetime = joda.ZonedDateTime
const Datetime = JodaType<joda.ZonedDateTime>('Datetime', joda.ZonedDateTime)
namespace Datetime {
  export type O = string
}

/*
// import moment from 'moment'
const cast = {
  Time: {
    toMoment(time: Time) {
      return moment(time.toString(), 'HH:mm:ss:ms')
    },
    fromMoment(moment: moment.Moment): Time {
      return joda.LocalTime.from(joda.nativeJs(moment))
    }
  },
  Datetime: {
    toMoment(datetime: Datetime) {
      return moment(datetime.toString())
    },
    fromMoment(m: moment.Moment): Datetime {
      return joda.ZonedDateTime.from(joda.nativeJs(moment))
    }
  }
}
*/

export {
  Datetime,
  Time
  // cast
}
