import React from 'react';
import * as R from 'ramda';
import { Easing, StyleSheet, ViewProps, GestureResponderEvent } from 'react-native'
import Button from './simple'
import { Raise } from '../styled/animations'

import styled from 'styled-components/native';
import { withDefaultProps } from '../lib/wrapper-components'
import * as themed from '../theme/themed'
import * as select from '../theme/style-props'
import color from 'color'

type StyleProp = ViewProps['style']

let defaultStyle: StyleProp = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 3,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
  alignSelf: 'flex-start',
}

let extract = R.memoizeWith(JSON.stringify, StyleSheet.flatten)
function extractStyles(style: StyleProp) {
  return R.omit(
    [
      'padding',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
    ],
    extract(style)
  )
}
function raiseStyle(
  style: StyleProp = {},
  color: RaisedButtonProps['shadow'],
  rise: number,
) {
  let { backgroundColor, ...styles } = extractStyles(style)
  return {
    ...styles,
    marginTop: rise,
    backgroundColor: typeof color === 'string' ? color : color(backgroundColor),
  }
}

type RaisedButtonProps = Omit<Button.Props, 'color'> & Omit<Raise.Props, 'maxRise'> & {
  shadow: string | ((color?: string) => string)
  pressed: boolean
}
type State = { rise: number }
class RaisedButton extends React.Component<RaisedButtonProps, State> {
  constructor(props: RaisedButtonProps) {
    super(props)
    this.state = { rise: this.props.rise }
  }
  onPressIn = (event: GestureResponderEvent) => {
    this.setState({ rise: 0 })
    if (this.props.onPressIn) {
      this.props.onPressIn(event)
    }
  }
  onPressOut = (event: GestureResponderEvent) => {
    this.setState({ rise: this.props.rise })
    if (this.props.onPressOut) {
      this.props.onPressOut(event)
    }
  }

  render() {
    let props = R.omit(
      [
        'shadow', 'rise', 'onPressIn', 'onPressOut', 'pressed',
        'style', 'color', 'background'
      ],
      this.props
    )
    let { pressed, shadow, rise } = this.props
    let style = Object.assign({}, defaultStyle, extract(this.props.style))
    return (
      <Raise maxRise={rise} rise={pressed || this.props.disabled ? 0 : this.state.rise}
          style={raiseStyle(style, shadow, rise)}>
        <Button {...props} onPressIn={this.onPressIn} onPressOut={this.onPressOut}
          style={[ defaultStyle, this.props.style ]}/>
      </Raise>
    )
  }
}

namespace Raised {
  export type _Props = themed.Props<RaisedButtonProps>
  export type Props = withDefaultProps<RaisedButtonProps>
}

let Raised = withDefaultProps<Raised._Props>(
  themed.defaultProps({
    rise: 4,
    activeOpacity: 0.8,
    shadow: bg => bg ? color(bg).darken(0.2).toString() : 'grey',
  }),
  styled<RaisedButtonProps>(RaisedButton)`
    background-color: ${select.text.background};

    padding-top: ${select.text.size(5)};
    padding-bottom: ${select.text.size(5)};
    padding-left: ${select.text.size(10)};
    padding-right: ${select.text.size(10)};
  ` as any
)

export default Raised
