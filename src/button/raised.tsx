import React from 'react';
import * as R from 'ramda';
import { Easing, StyleSheet, ViewProps } from 'react-native'
import * as Animatable from 'react-native-animatable'

type StyleProp = ViewProps['style']

namespace Raise {
  export type Props = {
    level: number
    color: string | ((color?: string) => string)
    children: React.ReactElement<ViewProps>
  } & Omit<Animatable.ViewProps, 'style'>
}

const defaultStyles = {
  borderBottomWidth: 0,
  borderBottomRadius: 0,
  borderBottomColor: 'transparent'
}

let extract = R.memoizeWith(R.identity, StyleSheet.flatten)

function extractStyles<T>(style: StyleProp) {
  return R.pick(
    [
      'backgroundColor',
      'borderBottomRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ],
    extract(style)
  )
}

function raiseStyle(
  childStyle: StyleProp,
  color: Raise.Props['color'],
  borderBottomWidth: number
) {
  let { backgroundColor, ...styles } = extractStyles(childStyle)
  let borderBottomColor = typeof color === 'string' ? color : color(backgroundColor)
  return {
    ...styles,
    borderBottomColor,
    borderBottomWidth
  }
}

function Raise ({
  level,
  color, // color or function 
  easing = Easing.elastic(1.25),
  duration = 300,
  children,
  transition = [ 'borderBottomWidth' ] as any,
  ...props
}: Raise.Props) {
  return (
    <Animatable.View 
      style={raiseStyle(children.props.style, color, level)}
      {...{ easing, duration, transition }} {...props}>
      {children}
    </Animatable.View>
  )
}

export { Raise }
