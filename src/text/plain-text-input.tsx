import React from 'react';
import { TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import * as select from '../theme/select'
import themed from '../theme/themed'

namespace TextInput {
  export type Props = TextInputProps
}

const TextInput = themed<TextInputProps>(styled.TextInput`
  flex: 1;
  color: ${select.text.color};
  background: ${select.text.background};
  font-size: ${select.text.size};
  outline: none;
` as any)

export default TextInput