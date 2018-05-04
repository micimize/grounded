import React from 'react';
import { View, Text, InputItem } from 'antd-mobile'
import { createComponent } from 'react-fela'

type Props = {
  value: string,
  children?: React.ReactChildren
}
const style = {
  fontSize: '1.2em'
}

function Title({ value, children }: Props) {
  return <Text style={style}>{value} {children}</Text>
}

const EditTitle = InputItem

export { EditTitle }
export default Title