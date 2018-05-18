import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon';

import { withDefaultProps } from '../lib/wrapper-components'
import { defaultTheme } from '../theme/themed'

import themed from '../theme/themed'
import * as select from '../theme/style-props'

namespace Button {
  export type Props = TouchableOpacityProps
}

let Button = themed(styled.TouchableOpacity`
  background-color: ${select.text.background};
`)

const Circle = withDefaultProps(
  {
    style: { borderRadius: 50, padding: 8 },
    theme: defaultTheme
  },
  Button
)