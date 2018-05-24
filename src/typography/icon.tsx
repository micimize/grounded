import React from 'react'
import * as R from 'ramda';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { IconProps } from 'react-native-vector-icons/Icon'

import styled from 'styled-components/native';

import themed from '../theme/themed'
import * as select from '../theme/style-props'

import * as load from './load-font.web'

// note that while color and size are still valid props,
// they are consumed by the theme
let ShadowedIcon = ({ name, style }: IconProps) =>
  <FontAwesome name={name} style={style}/>

let Style = Icon => styled<IconProps>(ShadowedIcon).attrs({
  selectable: false
})`
  text-align: center; 
  color: ${select.text.color};
  font-size: ${select.text.size()};
`

load.FontAwesome()

namespace Icon {
  export type Props = themed<IconProps>
}

const Icon = themed(Style(FontAwesome))

export default Icon
