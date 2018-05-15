import React from 'react';
import { TextProps } from 'react-native'
import styled from 'styled-components/native'
import * as select from '../theme/select'
import themed from '../theme/themed'

const PlainText = styled.Text`
  color: ${select.text.color};
  background: ${select.text.background};
  font-size: ${select.text.size};
`

export default themed<TextProps>(PlainText as any)