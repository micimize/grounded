import React from 'react';
import styled, { css } from 'styled-components/native'
import { View, ViewProps } from 'react-native-animatable'

import lens from '../lib/lens'
import selector, { pick } from '../lib/selector'
import { withDefaultProps } from '../lib/wrapper-components'

import * as themed from '../theme/themed'

namespace Box {
  export type Props = { editing: boolean | 'invite', multiline: boolean } & ViewProps
}
type Props = Box.Props

const Props = lens<Props>()

const Animated = withDefaultProps<Props>(
  {
    useNativeDriver: true,
    transition: [
      'paddingBottom', 'borderBottomColor', 'borderBottomWidth',
      'paddingLeft', 'borderLeftColor', 'borderLeftWidth'
    ] as any
  },
  ({ editing, multiline, ...props }: Props) => <View {...props}/>
)

let when = {
  editing: selector(
    Props.editing, {
      default: false
    }
  ),
  multiline: selector(
    Props.multiline, {
      default: false
    }
  )
}

let paddingWidth = when.editing({
  false: 4,
  invite: 2,
  true: 1
})

let borderWidth = when.editing({
  false: 0,
  invite: 2,
  true: 3
})

let content = pick(themed.with.colors.content.muted)

let borderColors = when.editing({
  false: content,
  invite: content,
  true: pick(themed.with.colors.feedback.info)
})

const Box = styled<Props>(Animated as React.ComponentClass<Props>)`
  margin-bottom: 12px;
  flex-direction: row;
  border-style: dashed;
  padding-bottom: ${paddingWidth};
  border-bottom-width: ${borderWidth};
  border-bottom-color: ${borderColors};

  ${when.multiline({
    true: css`
      align-items: flex-start;
      padding-left: ${paddingWidth};
      border-left-width: ${borderWidth};
      border-left-color: ${borderColors};
    `,
    false: css`
      align-items: flex-start;
      padding-left: 4;
    `
  })}
`

export default Box