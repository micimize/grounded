import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import * as select from '../theme/style-props'
import themed from '../theme/themed'

type PlainTextInputProps = Omit<TextInputProps, 'onChangeText'> & {
  onEdit?: (text: string) => any
}

const TextEditor = ({ onEdit, numberOfLines, ...props }: PlainTextInputProps) => (
  <RNTextInput onChangeText={onEdit}
    numberOfLines={props.multiline ?
      (props.value || '').split('\n').length :
      undefined}
    {...props}/>
)

const TextInput = themed(styled(TextEditor)`
  flex: 1;
  color: ${select.text.color};
  background: ${select.text.background};
  font-size: ${select.text.size()};
  outline: none;
`)

namespace TextInput {
  export type Props = themed<PlainTextInputProps>
}

export default TextInput
