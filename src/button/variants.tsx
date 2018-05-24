import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import FontAwesome from '../typography/icon'

import { withDefaultProps } from '../lib/wrapper-components'
import { defaultTheme } from '../theme/themed'

import themed from '../theme/themed'
import * as select from '../theme/style-props'

import Button from './raised'

let defaultProps = {
  style: {
    width: 25,
    height: 25,
    borderRadius: 50
  } as Button.Props['style'],
  theme: defaultTheme
}

const Circle = withDefaultProps(defaultProps, Button)

namespace Icon {
  export type Props = FontAwesome.Props & Button.Props
}

// TODO defaultProps doesn't merge but overrides
const Icon = withDefaultProps(
  defaultProps,
  ({ name, style, ...props }: themed.Inner<Icon.Props>) => {
    return (
      <Circle style={style} {...props}>
        <FontAwesome name={name} {...props} />
      </Circle>
    )
  })

export { Circle, Icon }
