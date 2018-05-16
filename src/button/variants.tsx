import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon';

import Button from './button'
import { withDefaultProps } from '../lib/wrapper-components'

const Circle = withDefaultProps<Button.Props>(
  {
    width: 25,
    height: 25,
    styles: { button: { borderRadius: 50 } }
  },
  Button
)

namespace Icon {
  export type Props = Pick<IconProps, 'size' | 'name' | 'color'> & Button.Props
}

const Icon = withDefaultProps<Icon.Props>(
  { size: 10 },
  ({ name, size, color, ...props }: Icon.Props) => (
    <Circle {...props}>
      <Icon {...{ name, size, color }} selectable={false} />
    </Circle>
  )
)

export { Circle, Icon }
