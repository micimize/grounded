import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon';

import { withDefaultProps } from '../lib/wrapper-components'
import { defaultTheme } from '../theme/themed'

import themed from '../theme/themed'
import * as select from '../theme/style-props'

import Button from './button'

const Circle = withDefaultProps(
  {
    width: 25,
    height: 25,
    styles: { button: { borderRadius: 50 } } as Button.Props['styles'],
    theme: defaultTheme
  },
  Button
)

namespace Icon {
  export type Props = Pick<IconProps, 'size' | 'name' | 'color'> & Button.Props
}

// TODO defaultProps doesn't merge but overrides
const Icon = withDefaultProps(
  Object.assign({ size: 15 }, Circle.defaultProps),
  ({ name, size, style, ...props }: themed.Inner<Icon.Props>) => {
    let color = select.text.color(props)
    return (
      <Circle {...props}>
        <FontAwesome
          selectable={false}
          style={{ textAlign: 'center' }}
          {...{ name, size, color }} />
      </Circle>
    )
  })

export { Circle, Icon }
