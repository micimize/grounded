import React from 'react'
import { Text as RNText, TextProps } from 'react-native'
import styled from 'styled-components/native'
import * as select from '../theme/style-props'
import themed from '../theme/themed'

type PlainTextProps = TextProps & {
  value?: string,
  multiline?: boolean,
  color?: string,
  size?: string,
  background?: boolean | string,
  innerRef?: any
}

const Text = ({
  children, value = '',
  multiline, color, background, innerRef, size,
  ...props
}: PlainTextProps & { children?: React.ReactNode }) => (
  <RNText {...props}>{children || value}</RNText>
)

const PlainText = themed(styled(Text)`
  color: ${select.text.color};
  background: ${select.text.background};
  font-size: ${select.text.size()};
`)

namespace PlainText {
  export type Props = themed<PlainTextProps>
}

export default PlainText
