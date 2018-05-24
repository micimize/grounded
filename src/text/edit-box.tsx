import React from 'react'
import * as R from 'ramda'
import styled, { css } from 'styled-components/native'
import { View, ViewProps } from 'react-native-animatable'

import lens from '../lib/lens'
import selector, { pick } from '../lib/selector'
import { withDefaultProps } from '../lib/wrapper-components'

import { Sprout } from '../styled/animations'
import Icon from '../typography/icon'

import * as themed from '../theme/themed'

type Editing = false | 'blurred' | 'focused'

import { Editable } from '../lib/wrapper-components'
namespace Box {
  export type Props = Editable.ControllerProps
    & { multiline: boolean }
    & ViewProps
}
type Props = Box.Props
const Props = lens<Props>()

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

let content = pick(themed.with.colors.content.muted)

let paddingWidth = when.editing({
  false: 4,
  blurred: 2,
  focused: 1
})

let borderWidth = when.editing({
  false: 0,
  blurred: 2,
  focused: 3
})

let borderColors = when.editing({
  false: content,
  blurred: content,
  focused: pick(themed.with.colors.feedback.info)
})

const fadingBorder = (side: 'left' | 'bottom' | 'top' | 'right') => css`
  padding-${side}: ${paddingWidth};
  border-${side}-width: ${borderWidth};
  border-${side}-color: ${borderColors};
`

const AnimatedContainer = withDefaultProps<Props & { innerRef?: any }>(
  {
    useNativeDriver: true,
    transition: [
      'paddingBottom', 'borderBottomColor', 'borderBottomWidth',
      'paddingLeft', 'borderLeftColor', 'borderLeftWidth'
    ] as any
  },
  ({ editing, multiline, children, innerRef, ...props }) => (
    <View {...props}>
      {children}
      <Sprout show={Boolean(editing)} style={{ position: 'absolute', right: 0 }}>
        <Icon name="pencil" />
      </Sprout>
    </View>
  )
)

const Box = styled<Props>(AnimatedContainer as React.ComponentClass<Props>)`
  /* margin-bottom: 12px; */
  flex-direction: row;
  border-style: dashed;
  ${fadingBorder('bottom')}

  ${when.multiline({
    true: css`
      align-items: flex-start;
      ${fadingBorder('left')}
    `,
    false: css`
      align-items: flex-start;
      padding-left: 4;
    `
  })}
`

export default Box
