import React from 'react'
import { Text as RNText } from 'react-native'
import { TextProps } from 'react-native'
import styled from 'styled-components/native'
import * as select from '../theme/style-props'
import themed from '../theme/themed'

type PlainTextProps = TextProps & { value?: string }

const Text = ({ value = '', ...props }: PlainTextProps) => (
  <RNText {...props}>{value}</RNText>
)

const PlainText = themed(styled(Text)`
  color: ${select.text.color};
  background: ${select.text.background};
  font-size: ${select.text.size};
`)

namespace PlainText {
  export type Props = themed<PlainTextProps>
}

export default PlainText
