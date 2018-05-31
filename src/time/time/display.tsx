import React from 'react';
import themed from '../../theme/themed'
import { LocalTime, DateTimeFormatter } from 'js-joda'
import PlainText from '../../text/plain-text'

type Time = LocalTime

/*
  Eventually characters will be a general solution for "tuple-like" strings.
  Time is a great example, where maybe you want a big primary hour, and a tiny, muted minutes.
  So, it'll look like characters={[['large', 'primary'], { '...': ['tiny', 'muted'] }]}
*/
namespace Time {
  export type Props = themed<Omit<PlainText.Props, 'value'> & {
    value?: Time,
    format?: string,
    // characters?: Array<string>
  }>
  export type Component = React.ComponentType<Props>
}

let font = {
  fontFamily: 'monospace'
}

const Time = P.styled(
  ({ value, style, format = 'h:mm', ...props }: Time.Props) => (
    <PlainText {...props} value={value && value.format(DateTimeFormatter.ofPattern(format))}/>
))`
  font-family: monospace;
`

export default Time