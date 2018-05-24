import React from 'react'
import { TextProps } from 'react-native'
import styled from 'styled-components/native'
import * as select from '../theme/style-props'
import themed from '../theme/themed'

type PlainTextProps = TextProps & { value?: string, multiline?: boolean, color?: string }

let RNText = styled.Text`
  color: ${select.text.color};
  background: ${select.text.background};
  font-size: ${select.text.size()};
`

const Text = ({
  children, value = '', multiline, color, ...props
}: PlainTextProps & { children?: React.ReactNode }) => (
  <RNText {...props}>{children || value}</RNText>
)

const PlainText = themed(Text)

namespace PlainText {
  export type Props = themed<PlainTextProps>
}

export default PlainText
