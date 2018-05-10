import React from 'react';
import { TextProps, TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import * as select from '../theme/select'
import themed from '../theme/themed'
import withDefaultProps from '../theme/with-default-props'

const Text = styled.Text`
  color: ${select.text.color}
  background: ${select.text.background}
  font-size: ${select.text.size}
`
type IP = Omit<TextInputProps, 'onChange'> & {
  onChange?: TextInputProps['onChangeText']
}

const TInput = styled.TextInput`
  color: ${select.text.color}
  background: ${select.text.background}
  font-size: ${select.text.size}
`

const Input = themed<IP>(({ onChange, multiline = true, ...props }) =>
  <TInput onChangeText={onChange} multiline={multiline} {...props}/>)

export { Input }

export default themed<TextProps>(Text as any)